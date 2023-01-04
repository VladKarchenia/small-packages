import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { useQuery } from "react-query"
import { Box, Combobox, ComboboxInput, Divider, FormCheckbox, FormInput } from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import {
  SSearchFilterComboboxMenu,
  SComboboxClearButton,
} from "./RecipientNameFilterCombobox.styles"
import debounce from "just-debounce-it"
import { getShipmentsFieldValuesFn } from "@/api/shipmentApi"

export const RecipientNameFilterCombobox = () => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)
  const { recipientName } = useDashboardStateContext()
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [results, setResults] = useState<string[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["searchRecipientNames"],
    () =>
      getShipmentsFieldValuesFn({
        // field: `data.CONSIGNEE_CONTACT${inputValue ? `:${inputValue}` : ""}`,
        field: `data.CONSIGNEE_CONTACT`,
        status: "SHIPMENT",
        organizationId: user?.activeOrganizationId,
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

      if (
        typeof inputValue !== "undefined" &&
        (inputValue.length > 3 || inputValue.trim().length === 0)
      ) {
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
    resetFilterField("recipientName")
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
      return <Box css={{ padding: "$12 $16" }}>LOADING</Box>
    }

    if (!isLoading && !isFetching && results.length === 0) {
      return <Box css={{ padding: "$12 $16" }}>EMPTY BOX</Box>
    }

    return (
      <>
        <Box
          css={{
            "> label": {
              padding: "$12 $16",
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
                  padding: "$12 $16",
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
                checked={recipientName.includes(item)}
              />
            </Box>
            <Divider />
          </>
        ))}
      </>
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
    <Combobox {...comboboxProps}>
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
