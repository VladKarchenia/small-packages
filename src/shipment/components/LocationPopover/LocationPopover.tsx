import { useEffect, useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { IPlaceResponse } from "@/api/types"
import { IAddress } from "@/shared/types"
import { useElementDimensions } from "@/shared/hooks"
import { useSearchPlaces } from "@/shipment/hooks"
import { transformLocation } from "@/shipment/utils"
import { spaceAndEnterKeyDown } from "@/shared/utils"

import {
  Box,
  ButtonIcon,
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

    if (data && data.content.length > 0) {
      data.content
        .filter((item: IPlaceResponse) => !!item.city && !!item.zipCode)
        .map((item: IPlaceResponse) => result.push(transformLocation({ ...item, person })))
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
          <Copy color="theme-b-n3">{error.response?.data.errorMessage || error.message}</Copy>
        </Flex>
      )
    }

    if (results.length === 0) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy color="theme-b-n3">Not found</Copy>
        </Flex>
      )
    }

    return (
      <>
        {results.map((location: IAddress) => (
          <Box
            key={`${label} ${location.displayName}`}
            onClick={() => handleClick(location)}
            tabIndex={0}
            onKeyDown={(e) => {
              spaceAndEnterKeyDown(e.key) && handleClick(location)
            }}
            css={{
              padding: "$12 $16",
              color: "$theme-b-n3",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              cursor: "pointer",

              hover: {
                backgroundColor: "$theme-n2-n7",
              },

              keyboardFocus: {
                backgroundColor: "$theme-n2-n7",
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
      <PopoverAnchor asChild>
        <Flex align="center" css={{ position: "relative" }} ref={containerRef}>
          <FormInput
            ref={triggerRef}
            value={inputValue}
            label={label}
            labelProps={labelProps}
            description={description}
            placeholder={placeholder}
            suffix={
              inputValue && (
                <ButtonIcon
                  ref={clearButtonRef}
                  icon={<IconCross />}
                  ariaLabel="Clear destination"
                  onClick={handleClearButton}
                  inputIcon
                />
              )
            }
            onClick={() => {
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
        </Flex>
      </PopoverAnchor>
      <PopoverContent
        close={() => setIsOpen(false)}
        align="start"
        css={{
          width: dimensions.clientWidth,
          maxHeight: 240,
          overflowY: "auto",
          keyboardFocus: {
            backgroundColor: "$theme-n2-n7",
          },
        }}
        onPointerDownOutside={(event) => {
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
