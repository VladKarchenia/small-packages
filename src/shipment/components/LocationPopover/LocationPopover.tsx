import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import debounce from "just-debounce-it"

import { searchPlacesFn } from "@/api/placeApi"
import { IPlaceResponse } from "@/api/types"
import { IAddress } from "@/shared/types"
import { useClearButton, useElementDimensions } from "@/shared/hooks"
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
import { IconCross } from "@/shared/icons"
import { IllustrationSpinner } from "@/shared/illustrations"

import { SComboboxClearButton } from "./LocationPopover.styles"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const { clearRef, isClearButtonClick } = useClearButton()
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [results, setResults] = useState<IAddress[]>([])
  const [notFound, setNotFound] = useState(false)
  const { isLoading, isFetching, refetch } = useQuery(
    ["searchPlaces"],
    () =>
      searchPlacesFn({
        country: country,
        keyword: inputValue,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        const result: IAddress[] = []

        if (data.first.content.length > 0) {
          data.first.content.map((item: IPlaceResponse) => result.push(transformLocation(item)))
        }

        if (data.second.content.length > 0) {
          data.second.content
            .filter((item: IPlaceResponse) => !!item.city && !!item.zipCode)
            .map((item: IPlaceResponse) => result.push(transformLocation(item)))
        }

        setResults(result)
        setNotFound(result.length === 0)
      },
    },
  )

  const handleClick = (locationDetails: IAddress) => {
    onChange(locationDetails)
    setInputValue(locationDetails.displayName)
    setResults([])
    setIsOpen(false)
  }

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
    setResults([])
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
        <Flex align="center" css={{ position: "relative" }} ref={containerRef}>
          <FormInput
            ref={triggerRef}
            value={inputValue}
            label={label}
            labelProps={labelProps}
            description={description}
            placeholder={placeholder}
            onClick={() => {
              if (!isOpen && inputValue.length > 3) {
                setResults([])
                refetch()
                return setIsOpen(true)
              }
            }}
            onFocus={() => {
              if (!isOpen && inputValue.length > 3) {
                setResults([])
                refetch()
                return setIsOpen(true)
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
              ref={clearRef}
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
        css={{
          width: dimensions.clientWidth,
          height: "max-content",
          maxHeight: "240px",
          overflow: "auto",
          padding: "$0",
          border: "none",
          borderRadius: "$0",
          zIndex: "$2",
        }}
        onInteractOutside={(e: any) => {
          if (isClearButtonClick(e)) {
            if (e.detail.originalEvent.isTrusted) {
              handleClearButton()
            }
            return
          }

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
