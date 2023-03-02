import { useEffect, useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useFormContext } from "react-hook-form"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { IPlaceResponse } from "@/api/types"
import { IAddress, ResidentialType, ShipmentState } from "@/shared/types"
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

interface IAddressFieldPopoverProps {
  name: string
  fieldName: keyof IAddress
  value: string
  onChange: (value: string) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  id: string
  label: string
  labelProps?: IFormLabelProps
  description?: string
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  defaultSuggestions?: string[]
  person: "sender" | "recipient" | "senderReturn"
}

export const AddressFieldPopover: React.FC<IAddressFieldPopoverProps> = ({
  name,
  fieldName,
  value,
  onChange,
  onBlur,
  id,
  label,
  labelProps,
  description,
  placeholder,
  disabled,
  errorMessage,
  defaultSuggestions,
  person,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<HTMLInputElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(value)

  const { getValues, setValue, trigger } = useFormContext<ShipmentState>()
  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)
  const city = getValues(`${person}.fullAddress.city`)

  const [keyword] = useDebounce(
    fieldName === "city" || !city
      ? `${zipCode} ${state} ${inputValue.trim()}`.toLowerCase()
      : `${zipCode} ${state} ${city} ${inputValue.trim()}`.toLowerCase(),
    300,
  )
  const [input] = useDebounce(inputValue.trim(), 300)
  const debouncedSetIsOpen = useDebouncedCallback((v) => setIsOpen(v), 300)

  const { data, isLoading, isIdle, error } = useSearchPlaces({
    input,
    country,
    keyword,
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
          .filter((item: IPlaceResponse) =>
            fieldName === "city"
              ? !!item.zipCode && !!item.city
              : !!item.zipCode && !!item.city && !!item.address1,
          )
          .map((item: IPlaceResponse) => result.push(transformLocation({ ...item, person })))
      }
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fieldName])

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails[fieldName] as string)
    setInputValue(locationDetails[fieldName] as string)

    if (fieldName === "address1") {
      setValue(`${person}.fullAddress.displayName`, locationDetails.displayName)
      setValue(`${person}.fullAddress.latitude`, locationDetails.latitude)
      setValue(`${person}.fullAddress.longitude`, locationDetails.longitude)
      setValue(`${person}.fullAddress.city`, locationDetails.city)

      trigger(`${person}.fullAddress.city`)
      trigger(`${person}.fullAddress.address1`)
    }

    setIsOpen(false)
  }

  const Content = () => {
    if (isIdle && !defaultSuggestions) {
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

    if (inputValue === "" && defaultSuggestions) {
      return (
        <>
          {defaultSuggestions.map((value: string) => (
            <Box
              key={`${label} ${value}`}
              onClick={() => {
                onChange(value)
                setInputValue(value)
                setIsOpen(false)
              }}
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
              {value}
            </Box>
          ))}
        </>
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
        {results
          .filter(
            (v: IAddress, i: number, a: IAddress[]) =>
              a.findIndex((v2: IAddress) => v2[fieldName] === v[fieldName]) === i,
          )
          .map((location: IAddress) => (
            <Box
              key={`${label} ${location[fieldName]}`}
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
              {/* TODO: the cities are different between response and chosen one */}
              {fieldName === "address1" && !city
                ? `${location.city}, ${location.address1}`
                : location[fieldName]}
            </Box>
          ))}
      </>
    )
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }} ref={containerRef}>
          <FormInput
            ref={triggerRef}
            name={name}
            value={inputValue}
            id={id}
            label={label}
            labelProps={labelProps}
            description={description}
            placeholder={placeholder}
            type="text"
            autoComplete="new-password"
            disabled={disabled}
            error={errorMessage}
            onClick={() => {
              if (!isOpen) {
                if (
                  (inputValue.trim().length === 0 && defaultSuggestions) ||
                  inputValue.trim().length > 3
                ) {
                  setIsOpen(true)
                }
              }
            }}
            onFocus={() => {
              if (!isOpen) {
                if (
                  (inputValue.trim().length === 0 && defaultSuggestions) ||
                  inputValue.trim().length > 3
                ) {
                  setIsOpen(true)
                }
              }
            }}
            onChange={(event) => {
              setInputValue(event.target.value)

              if (
                (event.target.value.trim().length === 0 && defaultSuggestions) ||
                event.target.value.trim().length > 3
              ) {
                debouncedSetIsOpen(true)
              } else {
                setIsOpen(false)
              }

              if (event.target.value !== value) {
                if (fieldName === "city") {
                  setValue(`${person}.fullAddress.address1`, "")
                }
                setValue(`${person}.fullAddress.address2`, "")
                setValue(`${person}.fullAddress.displayName`, "")
                setValue(`${person}.fullAddress.latitude`, "")
                setValue(`${person}.fullAddress.longitude`, "")
                if (person === "recipient") {
                  setValue(
                    `${person}.fullAddress.isResidential`,
                    JSON.parse(ResidentialType.Nonresidential),
                  )
                }
              }
            }}
            onBlur={onBlur}
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
        align="start"
        css={{
          width: dimensions.clientWidth,
          height: "max-content",
          maxHeight: "$192",
          overflow: "auto",
          padding: 0,
          border: "none",
          borderRadius: 0,
          zIndex: "$2",
          outline: "none",
        }}
        onInteractOutside={(event) => {
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
