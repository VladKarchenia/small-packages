import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import debounce from "just-debounce-it"
import {
  Box,
  Flex,
  FormInput,
  IFormLabelProps,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/shared/components"
import { searchPlacesFn } from "@/api/placeApi"
import { IAddress } from "@/shared/types"
import { useFormContext } from "react-hook-form"
import { ShipmentState } from "@/shared/state"
import { useElementDimensions } from "@/shared/hooks"

const transformLocation = ({
  displayName,
  country,
  zipCode,
  state,
  city,
  address1,
  address2,
  latitude,
  longitude,
}: any) => {
  return {
    displayName,
    country,
    zipCode,
    state,
    city,
    address1,
    address2,
    latitude,
    longitude,
  }
}

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
  person: "sender" | "recipient"
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
  // TODO: fix other cases with containerRef + width and Box in Box suggestion items
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<any>(null)
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(value)
  const [locations, setLocations] = useState<any>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { resetField, getValues, setValue, trigger } = useFormContext<ShipmentState>()
  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)
  const city = getValues(`${person}.fullAddress.city`)

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails[fieldName] as string)
    setInputValue(locationDetails[fieldName] as string)

    if (fieldName === "address1" && !city) {
      setValue(`${person}.fullAddress.city`, locationDetails.city)
      trigger(`${person}.fullAddress.city`)
    }

    setLocations([])
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
        organizationId: user?.activeOrganizationId,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        const result: any[] = []

        if (data.first.content.length > 0) {
          // TODO: need to filter results
          data.first.content.map((item: any) => result.push(item))
        }

        if (data.second.content.length > 0) {
          data.second.content
            .filter((item: any) =>
              fieldName === "city" ? !!item.city : !!item.zipCode && !!item.city && !!item.address1,
            )
            .map((item: any) => result.push(item))
        }

        setLocations(result)
      },
    },
  )

  const Content = () => {
    if (isLoading || isFetching) {
      return <Box>LOADING</Box>
    }

    if (
      !isLoading &&
      !isFetching &&
      locations.length === 0 &&
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
                setLocations([])
                setIsOpen(false)
              }}
              css={{
                width: dimensions.clientWidth,
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

    if (!isLoading && !isFetching && locations.length === 0 && inputValue.length > 0) {
      return <Box>EMPTY BOX</Box>
    }

    return (
      <>
        {locations
          .filter(
            (v: any, i: number, a: any[]) =>
              a.findIndex((v2: any) => v2[fieldName] === v[fieldName]) === i,
          )
          .map((location: any) => (
            <Box
              key={`${label} ${location[fieldName]}`}
              onClick={() => handleClick(transformLocation(location))}
              css={{
                width: dimensions.clientWidth,
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
            disabled={disabled}
            error={error}
            onClick={() => {
              if (!isOpen) {
                setLocations([])
                setIsOpen(true)

                if (inputValue.length > 3) {
                  refetch()
                }
              }
            }}
            onFocus={() => {
              if (!isOpen) {
                setLocations([])
                setIsOpen(true)

                if (inputValue.length > 3) {
                  refetch()
                }
              }
            }}
            onChange={(e: any) => {
              setInputValue(e.target.value)
              setLocations([])

              if (e.target.value.length > 3) {
                debouncedRefetch()

                if (!isOpen) {
                  setIsOpen(true)
                }
              } else {
                setIsOpen(false)
              }

              if (e.target.value !== value) {
                resetField(`${person}.fullAddress.address1`)
                resetField(`${person}.fullAddress.address2`)
                resetField(`${person}.fullAddress.displayName`)
                resetField(`${person}.fullAddress.latitude`)
                resetField(`${person}.fullAddress.longitude`)
                if (person === "recipient") {
                  resetField(`${person}.fullAddress.isResidential`)
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
          padding: "$0",
          border: "none",
          borderRadius: "$8",
          zIndex: "$2",
          overflow: "auto",
          maxHeight: "$192",
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
