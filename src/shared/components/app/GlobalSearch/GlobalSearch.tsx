import { useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { useSearchShipments } from "@/shared/data"
import { IFoundShipmentResponse } from "@/api/types"
import { ShippingType } from "@/shared/types"
import { useElementDimensions } from "@/shared/hooks"
import { TRACKING } from "@/constants"

import {
  Box,
  Copy,
  Flex,
  FormInput,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
} from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"

import { SComboboxClearButton } from "./GlobalSearch.styles"

export const GlobalSearch = () => {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<HTMLInputElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const clearButtonRef = useRef<HTMLButtonElement>(null)
  const isClearButtonClick = (event: Event) =>
    event.composedPath().includes(clearButtonRef.current as EventTarget)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [keyword] = useDebounce(inputValue.trim(), 300)
  const debouncedSetIsOpen = useDebouncedCallback((v) => setIsOpen(v), 300)

  const { data, isLoading, isIdle, error } = useSearchShipments(keyword)

  const results = useMemo(() => (data ? data : []), [data])

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
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
        {results.map((shipment: IFoundShipmentResponse) => {
          const shippingType = shipment.SHIPMENT_STATUS.includes("QUOTE")
            ? ShippingType.Quote
            : ShippingType.Shipment

          return (
            <Box
              key={`${shipment.ID}`}
              onClick={() => navigate(`${TRACKING}/${shippingType}/${shipment.ID}`)}
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
              <Copy scale={9} color="system-black" bold>
                #{shipment.ID}
              </Copy>
              <Copy scale={10} color="system-black">
                {shipment.ORIGIN_ADDRESS}
              </Copy>
            </Box>
          )
        })}
      </>
    )
  }

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }} ref={containerRef}>
          <FormInput
            ref={triggerRef}
            value={inputValue}
            label="Search"
            labelProps={{ hidden: true }}
            placeholder="Search for quotes and shipments by ID, address..."
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
            prefix={<IconSearch />}
            css={{ width: 410, height: "$40", minHeight: "$40" }}
          />
          {inputValue?.length > 0 && (
            <SComboboxClearButton
              ref={clearButtonRef}
              type="button"
              aria-label="clearDestination"
              css={{ position: "absolute", right: "$12", zIndex: "$1" }}
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
          maxHeight: 330,
          overflow: "auto",
          padding: 0,
          border: "none",
          borderRadius: 0,
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
