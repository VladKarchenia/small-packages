import { useEffect, useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useFormContext } from "react-hook-form"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { IPlaceResponse } from "@/api/types"
import { IAddress, ResidentialType, ShipmentState } from "@/shared/types"
import { useElementDimensions } from "@/shared/hooks"
import { useSearchAddresses } from "@/shipment/hooks"
import { transformLocation } from "@/shipment/utils"
import { spaceAndEnterKeyDown } from "@/shared/utils"

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
  person: "sender" | "recipient" | "senderReturn"
  zipLatitude: string
  zipLongitude: string
}

export const AddressFieldPopover: React.FC<IAddressFieldPopoverProps> = ({
  name,
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
  person,
  zipLatitude,
  zipLongitude,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<HTMLInputElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(value)

  const { getValues, setValue, trigger, clearErrors } = useFormContext<ShipmentState>()
  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)
  const city = getValues(`${person}.fullAddress.city`)

  const [address] = useDebounce(`${inputValue.trim()}`.toLowerCase(), 300)
  const [input] = useDebounce(inputValue.trim(), 300)
  const debouncedSetIsOpen = useDebouncedCallback((v) => setIsOpen(v), 300)

  const { data, isLoading, isIdle, error } = useSearchAddresses({
    input,
    country,
    zipCode,
    state,
    city,
    address,
  })

  const results = useMemo(() => {
    const result: IAddress[] = []

    if (data && data.content.length > 0) {
      data.content
        .filter((item: IPlaceResponse) => !!item.address1 && item.zipCode === zipCode)
        .map((item: IPlaceResponse) => result.push(transformLocation({ ...item, person })))
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails.address1)
    setInputValue(locationDetails.address1)

    setValue(`${person}.fullAddress.latitude`, locationDetails.latitude)
    setValue(`${person}.fullAddress.longitude`, locationDetails.longitude)
    setValue(`${person}.fullAddress.displayName`, locationDetails.displayName)
    trigger(`${person}.fullAddress.address1`)

    setIsOpen(false)
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
        {results
          .filter(
            (v: IAddress, i: number, a: IAddress[]) =>
              a.findIndex((v2: IAddress) => v2.address1 === v.address1) === i,
          )
          .map((location: IAddress) => (
            <Box
              key={`${label} ${location.address1}`}
              onClick={() => handleClick(location)}
              tabIndex={0}
              onKeyDown={(e: { key: string }) =>
                spaceAndEnterKeyDown(e.key) && handleClick(location)
              }
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
              {location.address1}
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
      <PopoverAnchor asChild>
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
                if (inputValue.trim().length === 0 || inputValue.trim().length > 3) {
                  setIsOpen(true)
                }
              }
            }}
            onFocus={() => {
              if (!isOpen) {
                if (inputValue.trim().length === 0 || inputValue.trim().length > 3) {
                  setIsOpen(true)
                }
              }
            }}
            onChange={(event) => {
              setInputValue(event.target.value)

              if (event.target.value.trim().length === 0 || event.target.value.trim().length > 3) {
                debouncedSetIsOpen(true)
              } else {
                setIsOpen(false)
              }

              if (event.target.value !== value) {
                setValue(`${person}.fullAddress.address2`, "")
                setValue(
                  `${person}.fullAddress.displayName`,
                  `${event.target.value}, ${city}, ${state}, ${zipCode}, ${country}`,
                )
                setValue(`${person}.fullAddress.latitude`, zipLatitude)
                setValue(`${person}.fullAddress.longitude`, zipLongitude)
                if (person === "recipient") {
                  setValue(
                    `${person}.fullAddress.isResidential`,
                    JSON.parse(ResidentialType.Nonresidential),
                  )
                }
                clearErrors([`${person}.fullAddress.address1`])
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
        close={() => setIsOpen(false)}
        align="start"
        css={{
          width: dimensions.clientWidth,
          maxHeight: "$192",
          overflow: "auto",
          keyboardFocus: {
            outline: "1px solid $theme-vl-n3",
          },
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
