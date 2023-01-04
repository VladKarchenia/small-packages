import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { useQuery } from "react-query"

import { IFoundShipmentResponse } from "@/api/types"
import { searchShipmentsFn } from "@/api/shipmentApi"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

import { Box, Combobox, ComboboxInput, Copy, Flex, FormInput } from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"

import { SSearchFilterComboboxMenu, SComboboxClearButton } from "./SearchTermCombobox.styles"

export const SearchTermCombobox = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchTerm } = useDashboardStateContext()
  const { setSearchTerm, resetFilterField } = useDashboardActionContext()
  const [inputValue, setInputValue] = useState<string>(searchTerm)

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

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch()
    }, 800),
    [],
  )

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    items: results,

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
      setSearchTerm(inputValue || "")
      setResults([])

      if (!inputValue || inputValue.length < 3 || inputValue.trim().length === 0) return

      if (inputValue.length > 3) {
        debouncedRefetch()
      }
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    resetFilterField("searchTerm")
    setResults([])
    inputRef.current?.focus()
  }, [comboboxProps, resetFilterField])

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

  useEffect(() => {
    if (inputValue.length > 3) {
      refetch()
    }
  }, [])

  return (
    <Combobox {...comboboxProps}>
      <Box css={{ paddingX: "$16" }}>
        <ComboboxInput ref={inputRef}>
          <FormInput
            id={t("filters.destination")}
            label={t("filters.destination")}
            placeholder={"Search"}
            labelProps={{ hidden: true }}
            autoCorrect="off"
            autoComplete="off"
            data-testid="displayName-input"
            prefix={<IconSearch size="xs" />}
            suffix={
              inputValue && (
                <SComboboxClearButton
                  type="button"
                  aria-label={t("filters.destinationClear")}
                  onClick={clearDestination}
                >
                  <IconCross size="xs" />
                </SComboboxClearButton>
              )
            }
          />
        </ComboboxInput>
      </Box>
      <SSearchFilterComboboxMenu>
        <Content />
      </SSearchFilterComboboxMenu>
    </Combobox>
  )
}
