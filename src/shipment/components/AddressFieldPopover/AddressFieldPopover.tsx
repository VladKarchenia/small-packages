import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import debounce from "just-debounce-it"
import { useFormContext } from "react-hook-form"

import { searchPlacesFn } from "@/api/placeApi"
import { IPlaceResponse } from "@/api/types"
import { IAddress } from "@/shared/types"
import { ShipmentState } from "@/shared/state"
import { useElementDimensions } from "@/shared/hooks"
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
} from "@/shared/components"
import { IllustrationSpinner } from "@/shared/illustrations"

interface IAddressFieldPopoverProps {
  name: string
  fieldName: keyof IAddress
  value: string
  onChange: (event: any) => void
  onBlur?: (event: any) => void
  id: string
  label: string
  labelProps?: IFormLabelProps
  description?: string
  placeholder?: string
  disabled?: boolean
  error?: string
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
  error,
  defaultSuggestions,
  person,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<any>(null)
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(value)

  const [results, setResults] = useState<IAddress[]>([])
  const [notFound, setNotFound] = useState(false)

  const { getValues, setValue, trigger } = useFormContext<ShipmentState>()
  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)
  const city = getValues(`${person}.fullAddress.city`)

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails[fieldName] as string)
    setInputValue(locationDetails[fieldName] as string)

    if (fieldName === "address1") {
      setValue(`${person}.fullAddress.displayName`, locationDetails.displayName)
      setValue(`${person}.fullAddress.latitude`, locationDetails.latitude)
      setValue(`${person}.fullAddress.longitude`, locationDetails.longitude)

      // if (!city) {
      setValue(`${person}.fullAddress.city`, locationDetails.city)
      trigger(`${person}.fullAddress.city`)
      // }

      trigger(`${person}.fullAddress.address1`)
    }

    setResults([])
    setIsOpen(false)
  }

  const { isLoading, isFetching, refetch } = useQuery(
    ["searchPlaces"],
    () =>
      searchPlacesFn({
        country: getValues(`${person}.fullAddress.country`),
        keyword:
          fieldName === "city" || !city
            ? `${country} ${zipCode} ${state} ${inputValue}`
            : `${country} ${zipCode} ${state} ${city} ${inputValue}`,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        const result: IAddress[] = []

        if (data.first.content.length > 0) {
          // TODO: need to filter results
          data.first.content.map((item: IPlaceResponse) => result.push(transformLocation(item)))
        }

        if (data.second.content.length > 0) {
          data.second.content
            .filter((item: IPlaceResponse) =>
              fieldName === "city"
                ? !!item.zipCode && !!item.city
                : !!item.zipCode && !!item.city && !!item.address1,
            )
            .map((item: IPlaceResponse) => result.push(transformLocation(item)))
        }

        setResults(result)
        setNotFound(result.length === 0)
      },
    },
  )

  const Content = () => {
    if (isLoading || isFetching) {
      return (
        <Flex align="center" css={{ padding: "$16", height: "$56" }}>
          <IllustrationSpinner css={{ display: "block", height: "$20", width: "$20" }} />
        </Flex>
      )
    }

    if (notFound) {
      return (
        <Flex css={{ padding: "$16" }}>
          <Copy scale={8} color="system-black">
            Not found
          </Copy>
        </Flex>
      )
    }

    if (
      !isLoading &&
      !isFetching &&
      results.length === 0 &&
      inputValue === "" &&
      defaultSuggestions
    ) {
      return (
        <>
          {defaultSuggestions.map((value: string) => (
            <Box
              key={`${label} ${value}`}
              onClick={() => {
                onChange(value)
                setInputValue(value)
                setResults([])
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

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch()
    }, 800),
    [],
  )

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
            error={error}
            onClick={() => {
              if (!isOpen) {
                setResults([])
                setIsOpen(true)

                if (inputValue.length > 3) {
                  refetch()
                }
              }
            }}
            onFocus={() => {
              if (!isOpen) {
                setResults([])
                setIsOpen(true)

                if (inputValue.length > 3) {
                  refetch()
                }
              }
            }}
            onChange={(e: any) => {
              setInputValue(e.target.value)
              setResults([])
              setNotFound(false)

              if (e.target.value.length > 3) {
                debouncedRefetch()

                if (!isOpen) {
                  setIsOpen(true)
                }
              } else {
                setIsOpen(false)
              }

              if (e.target.value !== value) {
                if (fieldName === "city") {
                  setValue(`${person}.fullAddress.address1`, "")
                }
                setValue(`${person}.fullAddress.address2`, "")
                setValue(`${person}.fullAddress.displayName`, "")
                setValue(`${person}.fullAddress.latitude`, "")
                setValue(`${person}.fullAddress.longitude`, "")
                if (person === "recipient") {
                  setValue(`${person}.fullAddress.isResidential`, false)
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
          padding: "$0",
          border: "none",
          borderRadius: "$0",
          zIndex: "$2",
          outline: "none",
        }}
        onInteractOutside={(e: any) => {
          if (isTriggerClick(e)) {
            return
          }

          return setIsOpen(false)
        }}
        onOpenAutoFocus={(e: any) => {
          e.preventDefault()
        }}
      >
        <Content />
      </PopoverContent>
    </Popover>
  )
}
