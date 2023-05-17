import { useMemo, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useDebounce, useDebouncedCallback } from "use-debounce"

import { useSearchShipments } from "@/shared/data"
import { IFoundShipmentResponse } from "@/api/types"
import { ShippingType } from "@/shared/types"
import { useElementDimensions } from "@/shared/hooks"
import { TRACKING } from "@/constants"
import { spaceAndEnterKeyDown } from "@/shared/utils"

import {
  Box,
  ButtonIcon,
  Copy,
  Flex,
  FormInput,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
} from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"

export const GlobalSearch = () => {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const triggerRef = useRef<HTMLInputElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const clearButtonRef = useRef<HTMLButtonElement>(null)
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
        {results.map((shipment: IFoundShipmentResponse) => {
          const shippingType = shipment.SHIPMENT_STATUS.includes("QUOTE")
            ? ShippingType.Quote
            : ShippingType.Shipment

          return (
            <Box
              key={`${shipment.ID}`}
              onClick={() => navigate(`${TRACKING}/${shippingType}/${shipment.ID}`)}
              tabIndex={0}
              onKeyDown={(e) => {
                spaceAndEnterKeyDown(e.key) &&
                  navigate(`${TRACKING}/${shippingType}/${shipment.ID}`)
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
              <Copy fontWeight="bold">#{shipment.ID}</Copy>
              <Copy scale={11}>{shipment.CONSIGNEE_ADDRESS}</Copy>
            </Box>
          )
        })}
      </>
    )
  }

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
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
            suffix={
              inputValue && (
                <ButtonIcon
                  ref={clearButtonRef}
                  icon={<IconCross />}
                  ariaLabel="Clear button"
                  onClick={handleClearButton}
                  inputIcon
                />
              )
            }
            css={{ width: 500, height: "$40", minHeight: "$40" }}
          />
        </Flex>
      </PopoverAnchor>
      <PopoverContent
        close={() => setIsOpen(false)}
        align="start"
        css={{
          width: dimensions.clientWidth,
          maxHeight: 330,
          overflow: "auto",
          keyboardFocus: {
            outline: "1px solid $theme-vl-n3",
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
