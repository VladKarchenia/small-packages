import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { useQuery } from "react-query"
import debounce from "just-debounce-it"

import { getShipmentsFieldValuesFn } from "@/api/shipmentApi"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

import { Box, ComboboxInput, Copy, Flex, FormCheckbox, FormInput, Stack } from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { IllustrationSpinner } from "@/shared/illustrations"

import {
  SSearchFilterComboboxMenu,
  SComboboxClearButton,
  SCombobox,
} from "./RecipientNameFilterCombobox.styles"

export const RecipientNameFilterCombobox = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const { recipientName } = useDashboardStateContext()
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [results, setResults] = useState<string[]>([])
  const [notFound, setNotFound] = useState(false)
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchRecipientNames"],
    () =>
      getShipmentsFieldValuesFn({
        field: `data.CONSIGNEE_CONTACT`,
        keyword: inputValue,
        status: "SHIPMENT",
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
      setResults([])
      setNotFound(false)

      if (
        typeof inputValue !== "undefined" &&
        (inputValue.trim().length === 0 || inputValue.length > 3)
      ) {
        debouncedRefetch()
      }

      return
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    resetFilterField("recipientName")
    setResults([])
    setNotFound(false)
    inputRef.current?.focus()
  }, [comboboxProps, resetFilterField])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = recipientName.filter((name) => name !== event.currentTarget.value)
      return setRecipientNameFilter(newArray)
    }

    const newArray = [...recipientName, event.currentTarget.value as string]
    return setRecipientNameFilter(newArray)
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("recipientName")
    }

    return setRecipientNameFilter(results)
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
      <Stack
        space={0}
        dividers
        css={{
          height: "100%",
          paddingX: "$16",
          "@md": { marginTop: 0 },
        }}
      >
        {results.length > 0 ? (
          <>
            <Box
              css={{
                "> label": {
                  paddingBottom: "$12",
                  cursor: "pointer",
                  focusWithin: {
                    backgroundColor: "$neutrals-3",
                  },
                },
              }}
            >
              <FormCheckbox
                value={"All"}
                onChange={handleCheckAllClick}
                name={"Select all"}
                id={"Select all"}
                label={"Select all"}
                checked={isCheckAll}
              />
            </Box>

            {results.map((item: string) => (
              <>
                <Box
                  key={item}
                  css={{
                    "> label": {
                      paddingY: "$12",
                      cursor: "pointer",
                      focusWithin: {
                        backgroundColor: "$neutrals-3",
                      },
                    },
                  }}
                >
                  <FormCheckbox
                    value={item}
                    onChange={handleChange}
                    name={item}
                    id={item}
                    label={item}
                    checked={recipientName.some((i) => i === item)}
                  />
                </Box>
              </>
            ))}
          </>
        ) : (
          <Flex css={{ padding: "$16", height: "$56" }} />
        )}
      </Stack>
    )
  }

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (recipientName.length === results.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [recipientName, results])

  return (
    <SCombobox {...comboboxProps}>
      <Box css={{ paddingX: "$16" }}>
        <ComboboxInput ref={inputRef}>
          <FormInput
            id={t("filters.destination")}
            label={t("filters.destination")}
            placeholder={"Search for recipient's name"}
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
