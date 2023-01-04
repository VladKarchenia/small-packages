import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
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
import { useClearButton } from "@/shared/hooks"
import { SComboboxClearButton } from "./GlobalSearch.styles"
import { useQuery } from "react-query"
import { searchShipmentsFn } from "@/api/shipmentApi"
import { IFoundShipmentResponse } from "@/api/types"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"

export const GlobalSearch = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { clearRef, isClearButtonClick } = useClearButton()
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [results, setResults] = useState<IFoundShipmentResponse[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchShipments"],
    () =>
      searchShipmentsFn({
        keyword: inputValue,
        organizationId: user?.activeOrganizationId,
        sort: "createdAt,asc",
        page: 0,
        size: 50,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        setResults(data.content)
      },
    },
  )

  const handleClearButton = () => {
    setInputValue("")
    setIsOpen(false)
    // onChange({ displayName: "", placeId: "" })
    if (triggerRef.current) {
      ;(triggerRef.current as HTMLInputElement).focus()
    }
  }

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch()
    }, 800),
    [],
  )

  const Content = () => {
    if (isLoading || isFetching) {
      return <Box css={{ padding: "$12 $16" }}>LOADING</Box>
    }

    if (!isLoading && !isFetching && results.length === 0) {
      return <Box css={{ padding: "$12 $16" }}>EMPTY BOX</Box>
    }

    return (
      <>
        {results.map((shipment: IFoundShipmentResponse) => (
          <Box
            key={`${shipment.id}`}
            css={{
              "> div": {
                padding: "$12 $16",
                cursor: "pointer",
                hover: {
                  backgroundColor: "$neutrals-3",
                },
              },
              firstChild: {
                "> div": {
                  borderRadius: "$8 $8 0 0",
                },
              },
              lastChild: {
                "> div": {
                  borderRadius: "0 0 $8 $8",
                },
              },
            }}
          >
            <Box
              css={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              onClick={() => navigate(`/tracking/${shipment.id}`)}
            >
              <Flex direction="column">
                <Copy scale={9} color="system-black" bold>
                  {shipment.id}
                </Copy>
                <Copy scale={10} color="system-black">
                  {shipment.origin_ADDRESS}
                </Copy>
              </Flex>
            </Box>
          </Box>
        ))}
      </>
    )
  }

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild={true}>
        <Flex align="center" css={{ position: "relative" }}>
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
            css={{ width: "410px", height: "$40", minHeight: "$40", paddingRight: "$56" }}
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
          width: "438px",
          padding: "$0",
          border: "none",
          borderRadius: "$8",
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
