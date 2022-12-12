import { useCallback, useRef, useState } from "react"
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
import { SSearchFilterComboboxMenu, SComboboxClearButton } from "./SearchTermCombobox.styles"

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

export const SearchTermCombobox = () => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)
  const { searchTerm } = useDashboardStateContext()
  const { setSearchTerm, resetFilterField } = useDashboardActionContext()
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

  const handleClick = (value: string) => {
    console.log(value)
  }

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
        {namesMockList.map((item) => (
          <>
            <Box
              key={item}
              css={{
                "> div": {
                  padding: "$12 $16",
                  cursor: "pointer",
                  focusWithin: {
                    backgroundColor: "$neutrals-3",
                  },
                },
              }}
            >
              <Box onClick={() => handleClick(item)}>{item}</Box>
            </Box>
            <Divider />
          </>
        ))}
      </SSearchFilterComboboxMenu>
    </Combobox>
  )
}
