import { useMemo, useState } from "react"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useCombobox } from "downshift"
import { useDebounce } from "use-debounce"

import { useSearchShipments } from "@/shared/data"
import { IFoundShipmentResponse } from "@/api/types"
import { ShippingType } from "@/shared/types"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { TRACKING } from "@/constants"

import { Box, Copy, Flex, MobileCombobox, Spinner, Stack } from "@/shared/components"
import { IconSearch } from "@/shared/icons"

export const SearchTermCombobox = () => {
  const navigate = useNavigate()
  const { searchTerm } = useDashboardStateContext()
  const { setSearchTerm, resetFilterField } = useDashboardActionContext()
  const [inputValue, setInputValue] = useState<string>(searchTerm)

  const [keyword] = useDebounce(inputValue.trim(), 300)

  const { data, isLoading, isIdle, error } = useSearchShipments(keyword)

  const results = useMemo(() => (data ? data : []), [data])

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    items: results,

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
      setSearchTerm(inputValue || "")
    },
  })

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
      <Stack
        space={0}
        dividers
        css={{
          height: "100%",
          paddingX: "$16",
          "@md": { marginTop: 0 },
        }}
      >
        {results.map((shipment: IFoundShipmentResponse) => {
          const shippingType = shipment.SHIPMENT_STATUS.includes("QUOTE")
            ? ShippingType.Quote
            : ShippingType.Shipment

          return (
            <Box
              key={`${shipment.ID}`}
              css={{
                "> div": {
                  paddingY: "$12",

                  keyboardFocus: {
                    backgroundColor: "$theme-n2-n7",
                  },
                },
                firstChild: {
                  "> div": {
                    paddingTop: 0,
                  },
                },
              }}
            >
              <Box
                css={{
                  color: "$theme-b-n3",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                onClick={() => navigate(`${TRACKING}/${shippingType}/${shipment.ID}`)}
              >
                <Flex direction="column">
                  <Copy fontWeight="bold">#{shipment.ID}</Copy>
                  <Copy scale={12}>{shipment.CONSIGNEE_ADDRESS}</Copy>
                </Flex>
              </Box>
            </Box>
          )
        })}
      </Stack>
    )
  }

  return (
    <MobileCombobox
      comboboxProps={comboboxProps}
      id="globalSearch"
      label="Global search"
      placeholder="Search"
      inputValue={inputValue}
      prefix={<IconSearch />}
      clearValueFn={() => resetFilterField("searchTerm")}
    >
      <Content />
    </MobileCombobox>
  )
}
