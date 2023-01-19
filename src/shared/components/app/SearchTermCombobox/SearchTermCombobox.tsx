import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import debounce from "just-debounce-it"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { useQuery } from "react-query"

import { IFoundShipmentResponse } from "@/api/types"
import { searchShipmentsFn } from "@/api/shipmentApi"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

import { Box, ComboboxInput, Copy, Flex, FormInput, Stack } from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { IllustrationSpinner } from "@/shared/illustrations"

import {
  SCombobox,
  SComboboxClearButton,
  SSearchFilterComboboxMenu,
} from "./SearchTermCombobox.styles"

export const SearchTermCombobox = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchTerm } = useDashboardStateContext()
  const { setSearchTerm, resetFilterField } = useDashboardActionContext()
  const [inputValue, setInputValue] = useState<string>(searchTerm)

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
      setNotFound(false)

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
    setNotFound(false)
    inputRef.current?.focus()
  }, [comboboxProps, resetFilterField])

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
      <Stack
        space={0}
        dividers
        css={{
          height: "100%",
          paddingX: "$16",
          "@md": { marginTop: 0 },
        }}
      >
        {results.map((shipment: IFoundShipmentResponse) => (
          <Box
            key={`${shipment.id}`}
            css={{
              "> div": {
                paddingY: "$12",
                cursor: "pointer",
                hover: {
                  backgroundColor: "$neutrals-3",
                },
              },
              firstChild: {
                "> div": {
                  paddingTop: "$0",
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
                  #{shipment.id}
                </Copy>
                <Copy scale={10} color="system-black">
                  {shipment.origin_ADDRESS}
                </Copy>
              </Flex>
            </Box>
          </Box>
        ))}
      </Stack>
    )
  }

  useEffect(() => {
    if (inputValue.length > 3) {
      refetch()
    }
  }, [])

  return (
    <SCombobox {...comboboxProps}>
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
            prefix={<IconSearch fixedSize width={20} height={20} />}
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
    </SCombobox>
  )
}
