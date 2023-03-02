import { useEffect, useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { IPlaceResponse } from "@/api/types"
import { IAddress } from "@/shared/types"
import { useElementDimensions } from "@/shared/hooks"
import { useSearchPlaces } from "@/shipment/hooks"
import { transformLocation } from "@/shipment/utils"

import {
  Box,
  Copy,
  Flex,
  FormInput,
  IFormLabelProps,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
} from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { SComboboxClearButton } from "./LocationPopover.styles"

interface ILocationPopoverProps {
  value: IAddress
  onChange: (locationDetails: IAddress) => void
  label: string
  labelProps?: IFormLabelProps
  description?: string
  placeholder: string
  country: string
  person: "sender" | "recipient"
}

export const LocationPopover: React.FC<ILocationPopoverProps> = ({
  value,
  onChange,
  label,
  labelProps,
  description,
  placeholder,
  country,
  person,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<HTMLInputElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const clearButtonRef = useRef<HTMLButtonElement>(null)
  const isClearButtonClick = (event: Event) =>
    event.composedPath().includes(clearButtonRef.current as EventTarget)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [input] = useDebounce(inputValue.trim(), 300)
  const debouncedSetIsOpen = useDebouncedCallback((v) => setIsOpen(v), 300)

  const { data, isLoading, isIdle, error } = useSearchPlaces({
    input,
    country,
    keyword: input,
  })

  const results = useMemo(() => {
    const result: IAddress[] = []

    if (data) {
      if (data.first.content.length > 0) {
        // TODO: need to filter results?
        data.first.content.map((item: IPlaceResponse) =>
          result.push(transformLocation({ ...item, person })),
        )
      }

      if (data.second.content.length > 0) {
        data.second.content
          .filter((item: IPlaceResponse) => !!item.city && !!item.zipCode)
          .map((item: IPlaceResponse) => result.push(transformLocation({ ...item, person })))
      }
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails)
    setInputValue(locationDetails.displayName)
    setIsOpen(false)
  }

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
    onChange({
      displayName: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      zipCode: "",
      state: "",
      latitude: "",
      longitude: "",
    })

    // if (triggerRef.current) {
    //   ;(triggerRef.current as HTMLInputElement).focus()
    // }
  }

  const Content = () => {
    if (isIdle) {
      return null
    }

    if (isLoading) {
      return <Spinner />
    }

    if (isAxiosError(error)) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy scale={8} color="system-black">
            {error.response?.data.errorMessage || error.message}
          </Copy>
        </Flex>
      )
    }

    if (results.length === 0) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy scale={8} color="system-black">
            Not found
          </Copy>
        </Flex>
      )
    }

    return (
      <>
        {results.map((location: IAddress) => (
          <Box
            key={`${label} ${location.displayName}`}
            onClick={() => handleClick(location)}
            css={{
              padding: "$12 $16",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              cursor: "pointer",
              hover: {
                backgroundColor: "$neutrals-3",
              },
            }}
          >
            {location.displayName}
          </Box>
        ))}
      </>
    )
  }

  useEffect(() => {
    setInputValue(value.displayName)
  }, [value.displayName])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }} ref={containerRef}>
          <FormInput
            ref={triggerRef}
            value={inputValue}
            label={label}
            labelProps={labelProps}
            description={description}
            placeholder={placeholder}
            onClick={() => {
              if (!isOpen && inputValue.trim().length > 3) {
                setIsOpen(true)
              }
            }}
            onFocus={() => {
              if (!isOpen && inputValue.trim().length > 3) {
                setIsOpen(true)
              }
            }}
            onChange={(event) => {
              setInputValue(event.target.value)

              if (event.target.value.trim().length > 3) {
                debouncedSetIsOpen(true)
              } else {
                setIsOpen(false)
              }
            }}
            css={{
              paddingRight: "$56",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          />
          {inputValue?.length > 0 && (
            <SComboboxClearButton
              ref={clearButtonRef}
              type="button"
              aria-label="clearDestination"
              css={{ position: "absolute", right: "$12", bottom: "$12", zIndex: "$1" }}
              onClick={handleClearButton}
            >
              <IconCross />
            </SComboboxClearButton>
          )}
        </Flex>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{
          width: dimensions.clientWidth,
          height: "max-content",
          maxHeight: 240,
          overflow: "auto",
          padding: 0,
          border: "none",
          borderRadius: 0,
          zIndex: "$2",
        }}
        onInteractOutside={(event) => {
          if (isClearButtonClick(event)) {
            if (event.detail.originalEvent.isTrusted) {
              handleClearButton()
            }
            return
          }

          if (isTriggerClick(event)) {
            return
          }

          return setIsOpen(false)
        }}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
      >
        <Content />
      </PopoverContent>
    </Popover>
  )
}
