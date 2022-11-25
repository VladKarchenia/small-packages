import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"

import {
  Combobox,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItemFormat,
  Copy,
  FormInput,
  HiddenVisually,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"

import { IconClock, IconCross, IconLocationPin } from "@/shared/icons"

// import { useDestinationSuggestions } from "./useDestinationSuggestions"
import {
  SSearchFilterComboboxItem,
  SSearchFilterComboboxMenu,
  SComboboxClearButton,
} from "./SearchFilterCombobox.styles"
import { useQuery } from "react-query"
import { getSuggestionsFn } from "@/api/postApi"
import { ISuggestionsResponse } from "@/api/types"
import { mapDestinationToComboboxItem } from "./utils"

interface ISearchFilterComboboxProps {
  onSelect: (value: string, label: string) => void
  initialValue?: string
  isDesktop?: boolean
  placeholder: string
}

export const SearchFilterCombobox = ({
  onSelect,
  initialValue,
  isDesktop,
  placeholder,
}: ISearchFilterComboboxProps) => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState("")

  // const [suggestedDestinations, getSuggestions] = useDestinationSuggestions()
  const { data: suggestedDestinations, refetch: getSuggestions } = useQuery(
    ["getSuggestions"],
    async () => await getSuggestionsFn(inputValue),
    {
      enabled: false,
      select: (data: ISuggestionsResponse) =>
        data.data.suggestionsByTerm.places.map(mapDestinationToComboboxItem) || [],
    },
  )

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    items: suggestedDestinations || [],
    itemToString: (item) => item?.label || "",

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")

      if (!inputValue || inputValue.length < 2 || inputValue.trim().length === 0) return

      getSuggestions()
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      onSelect(selectedItem.label, selectedItem.value)
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    inputRef.current?.focus()
  }, [comboboxProps])

  useEffect(() => {
    if (!initialValue || initialValue.length < 2 || initialValue.trim().length === 0) return
    setInputValue(initialValue)
    getSuggestions()
  }, [initialValue, getSuggestions])

  return (
    <Combobox {...comboboxProps}>
      <ComboboxInput ref={inputRef}>
        {/* TODO: Remove after activating desktopFilterExp */}
        {isDesktop ? (
          <div /> // Empty div for Combobox to 'forwardRef' to
        ) : (
          <FormInput
            id={t("filters.destination")}
            label={t("filters.destination")}
            placeholder={placeholder}
            labelProps={{ hidden: true }}
            autoCorrect="off"
            autoComplete="off"
            data-testid="location-input"
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
        )}
      </ComboboxInput>
      <SSearchFilterComboboxMenu>
        <Stack space={24}>
          <DestinationSection
            name="suggestions"
            label={t("filters.destinationSuggestions")}
            items={suggestedDestinations || []}
            hiddenLabel
            isDesktop={isDesktop}
          />
        </Stack>
      </SSearchFilterComboboxMenu>
    </Combobox>
  )
}

interface IDestinationSectionProps {
  name: "recent" | "popular" | "suggestions"
  label: string
  items: ComboboxItemFormat[]

  indexOffset?: number
  hiddenLabel?: boolean
  isDesktop?: boolean
}

function DestinationSection({
  name,
  label,
  items,
  hiddenLabel,
  indexOffset = 0,
  isDesktop,
}: IDestinationSectionProps) {
  if (!items.length) return null
  const itemCount = isDesktop && name === "recent" ? 3 : items.length
  const LabelOuter = hiddenLabel ? HiddenVisually : Fragment

  return (
    <>
      <LabelOuter>
        <Title id={`destination-group-${name}`} as="h6" scale={8}>
          {label}
        </Title>
      </LabelOuter>
      {!hiddenLabel && <Spacer size={8} />}
      <ComboboxGroup labelledBy={`destination-group-${name}`}>
        {items.slice(0, itemCount).map((item, index) => (
          <RecentDestinationBox
            name={name}
            item={item}
            index={index}
            indexOffset={indexOffset}
            key={`recent-destination-${index}`}
          />
        ))}
      </ComboboxGroup>
    </>
  )
}

const RecentDestinationBox = ({
  item,
  index,
  indexOffset,
  name,
}: {
  item: ComboboxItemFormat
  index: number
  indexOffset: number
  name: "recent" | "popular" | "suggestions"
}) => {
  if (!item.label || !item.value) return null

  return (
    <SSearchFilterComboboxItem
      key={`${item.label}-${index}`}
      index={index + indexOffset}
      item={item}
    >
      {name === "recent" ? <IconClock /> : <IconLocationPin />}
      <Spacer size={8} horizontal />
      <Copy color="neutrals-9" intent="detail">
        {item.label}
      </Copy>
    </SSearchFilterComboboxItem>
  )
}
