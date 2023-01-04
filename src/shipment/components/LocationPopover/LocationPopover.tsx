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
import { IconCross } from "@/shared/icons"
import { searchPlacesFn } from "@/api/placeApi"
import { IAddress } from "@/shared/types"
import { SComboboxClearButton } from "./LocationPopover.styles"

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

interface ILocationPopoverProps {
  value: IAddress
  onChange: (locationDetails: IAddress) => void
  label: string
  labelProps?: IFormLabelProps
  description?: string
  placeholder: string
  country: string
}

export const LocationPopover: React.FC<ILocationPopoverProps> = ({
  value,
  onChange,
  label,
  labelProps,
  description,
  placeholder,
  country,
}) => {
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(value.displayName)
  const [locations, setLocations] = useState<any>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails)
    setInputValue(locationDetails.displayName)
    setLocations([])
    setIsOpen(false)
  }

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
    setLocations([])
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

  const { isLoading, isFetching, refetch } = useQuery(
    ["searchPlaces"],
    () =>
      searchPlacesFn({
        country: country,
        keyword: inputValue,
        organizationId: user?.activeOrganizationId,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        const result: any[] = []

        if (data.first.content.length > 0) {
          data.first.content.map((item: any) => result.push(item))
        }

        if (data.second.content.length > 0) {
          data.second.content
            .filter((item: any) => !!item.city && !!item.zipCode)
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

    if (!isLoading && !isFetching && locations.length === 0) {
      return <Box>EMPTY BOX</Box>
    }

    return (
      <>
        {locations.map((location: any) => (
          <Box
            key={`${label} ${location.displayName}`}
            css={{
              "> div": {
                padding: "$12 $16",
                cursor: "pointer",
                hover: {
                  backgroundColor: "$neutrals-3",
                },
              },
            }}
          >
            <Box
              css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
              onClick={() => handleClick(transformLocation(location))}
            >
              {location.displayName}
            </Box>
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
    setInputValue(value.displayName)
  }, [value.displayName])

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }}>
          <FormInput
            ref={triggerRef}
            value={inputValue}
            label={label}
            labelProps={labelProps}
            description={description}
            placeholder={placeholder}
            onClick={() => {
              if (!isOpen && inputValue.length > 3) {
                setLocations([])
                refetch()
                return setIsOpen(true)
              }
            }}
            onFocus={() => {
              if (!isOpen && inputValue.length > 3) {
                setLocations([])
                refetch()
                return setIsOpen(true)
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
              type="button"
              aria-label={"clearDestination"}
              css={{ position: "absolute", right: "$12", bottom: "$12", zIndex: "$1" }}
              onClick={handleClearButton}
            >
              <IconCross size="xs" />
            </SComboboxClearButton>
          )}
        </Flex>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ padding: "$0", border: "none", borderRadius: "$8", zIndex: "$2" }}
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
