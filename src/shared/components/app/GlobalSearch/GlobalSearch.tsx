import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"
import { useQuery } from "react-query"

import { searchShipmentsFn } from "@/api/shipmentApi"
import { IFoundShipmentResponse } from "@/api/types"
import { useClearButton, useElementDimensions } from "@/shared/hooks"

import {
  Box,
  Copy,
  Flex,
  FormInput,
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { IllustrationSpinner } from "@/shared/illustrations"

import { SComboboxClearButton } from "./GlobalSearch.styles"

export const GlobalSearch = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { dimensions } = useElementDimensions(containerRef)
  const { clearRef, isClearButtonClick } = useClearButton()
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [results, setResults] = useState<IFoundShipmentResponse[]>([])
  const [notFound, setNotFound] = useState(false)
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchShipments"],
    () =>
      searchShipmentsFn({
        keyword: inputValue,
        sort: "createdAt,asc",
        page: 0,
        size: 50,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        setResults(data.content)
        setNotFound(data.content.length === 0)
      },
    },
  )

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
    setResults([])
    setNotFound(false)
    // if (triggerRef.current) {
    //   ;(triggerRef.current as HTMLInputElement).focus()
    // }
  }

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch()
    }, 800),
    [],
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

    return (
      <>
        {results.map((shipment: IFoundShipmentResponse) => (
          <Box
            key={`${shipment.id}`}
            onClick={() => navigate(`/tracking/${shipment.id}`)}
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
              #{shipment.id}
            </Copy>
            <Copy scale={10} color="system-black">
              {shipment.origin_ADDRESS}
            </Copy>
          </Box>
        ))}
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
            prefix={<IconSearch height={20} width={20} fixedSize />}
            css={{ width: "410px", height: "$40", minHeight: "$40" }}
          />
          {inputValue?.length > 0 && (
            <SComboboxClearButton
              ref={clearRef}
              type="button"
              aria-label={t("filters.clearDestination")}
              css={{ position: "absolute", right: "$12", zIndex: "$1" }}
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
          maxHeight: "330px",
          overflow: "auto",
          padding: "$0",
          border: "none",
          borderRadius: "$0",
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
