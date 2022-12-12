import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { useQuery } from "react-query"
import {
  Box,
  Combobox,
  ComboboxInput,
  ComboboxItemFormat,
  Divider,
  FormCheckbox,
  FormInput,
} from "@/shared/components"
import { IconCross, IconSearch } from "@/shared/icons"
import { getSuggestionsFn } from "@/api/postApi"
import { ISuggestionsResponse } from "@/api/types"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import {
  SSearchFilterComboboxMenu,
  SComboboxClearButton,
} from "./RecipientNameFilterCombobox.styles"

const namesMockList = [
  "James Bond",
  "Harry Brown",
  "Oviler Calhoun",
  "Jack Donaldson",
  "Thomas Roger",
  "Jacob Lamberts",
]

// interface ISearchFilterComboboxProps {
//   onSelect: (value: string, label: string) => void
//   initialValue?: string
//   placeholder: string
// }

export const RecipientNameFilterCombobox = () => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)
  const { recipientName } = useDashboardStateContext()
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState("")

  // const { data: suggestedDestinations, refetch: getSuggestions } = useQuery(
  //   ["getSuggestions"],
  //   async () => await getSuggestionsFn(inputValue),
  //   {
  //     enabled: false,
  //     select: (data: ISuggestionsResponse) =>
  //       data.data.suggestionsByTerm.places.map(mapDestinationToComboboxItem) || [],
  //   },
  // )

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    // items: suggestedDestinations || [],
    items: [] as ComboboxItemFormat[],
    itemToString: (item) => item?.label || "",

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")

      if (!inputValue || inputValue.trim().length < 2) return

      // getSuggestions()
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    inputRef.current?.focus()
  }, [comboboxProps])

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

    return setRecipientNameFilter(namesMockList)
  }

  useEffect(() => {
    if (recipientName.length === namesMockList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [recipientName])

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
            data-testid="location-input"
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

        {namesMockList.map((item) => (
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
      </SSearchFilterComboboxMenu>
    </Combobox>
  )
}
