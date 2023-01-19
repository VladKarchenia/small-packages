import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import debounce from "just-debounce-it"

import { searchPlacesFn } from "@/api/placeApi"
import { IAddress } from "@/shared/types"
import { IPlaceResponse } from "@/api/types"

import { Box, ComboboxGroup, ComboboxInput, Copy, Flex, FormInput } from "@/shared/components"
import { IconCross } from "@/shared/icons"
import { IllustrationSpinner } from "@/shared/illustrations"

import {
  SDestinationComboboxItem,
  SComboboxMenu,
  SComboboxClearButton,
  SCombobox,
} from "./DestinationCombobox.styles"

export interface DestinationComboboxProps {
  onSelect: (locationDetails: IAddress) => void
  initialValue: IAddress
  id: string
  label: string
  placeholder?: string
  country: string
}

export const DestinationCombobox = ({
  onSelect,
  initialValue,
  id,
  label,
  placeholder,
  country,
}: DestinationComboboxProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>("")

  const [results, setResults] = useState<IPlaceResponse[]>([])
  const [notFound, setNotFound] = useState(false)
  const { isLoading, isFetching, refetch } = useQuery(
    ["searchPlaces"],
    () =>
      searchPlacesFn({
        country: country,
        keyword: inputValue,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        const result: IPlaceResponse[] = []

        if (data.first.content.length > 0) {
          data.first.content.map((item: IPlaceResponse) => result.push(item))
        }

        if (data.second.content.length > 0) {
          data.second.content
            .filter((item: IPlaceResponse) => !!item.city && !!item.zipCode)
            .map((item: IPlaceResponse) => result.push(item))
        }

        setResults(result)
        setNotFound(result.length === 0)
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
    itemToString: (item: IPlaceResponse | null) => item?.displayName || "",

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
      setResults([])
      setNotFound(false)

      if (typeof inputValue !== "undefined" && inputValue.length > 3) {
        debouncedRefetch()
      }

      return
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      onSelect(selectedItem)
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    setResults([])
    setNotFound(false)
    inputRef.current?.focus()
  }, [comboboxProps])

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
      <Box
        css={{
          height: "100%",
          paddingX: "$16",
          "@md": { marginTop: 0 },
        }}
      >
        {results.length > 0 ? (
          <DestinationSection items={results} />
        ) : (
          <Flex css={{ padding: "$16", height: "$56" }} />
        )}
      </Box>
    )
  }

  useEffect(() => {
    setInputValue(initialValue.displayName)

    if (initialValue.displayName.length > 3) {
      refetch()
    }
  }, [initialValue.displayName, refetch])

  return (
    <SCombobox {...comboboxProps}>
      <Box css={{ paddingX: "$16" }}>
        <ComboboxInput ref={inputRef}>
          <FormInput
            id={id}
            label={label}
            placeholder={placeholder}
            labelProps={{ hidden: true }}
            autoCorrect="off"
            autoComplete="off"
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
      <SComboboxMenu>
        <Content />
      </SComboboxMenu>
    </SCombobox>
  )
}

interface IDestinationSectionProps {
  items: IPlaceResponse[]
}

function DestinationSection({ items }: IDestinationSectionProps) {
  return (
    <ComboboxGroup labelledBy={"combobox-group"}>
      {items.map((item, index) => (
        <DestinationBox item={item} index={index} key={`combobox-${index}`} />
      ))}
    </ComboboxGroup>
  )
}

const DestinationBox = ({ item, index }: { item: IPlaceResponse; index: number }) => (
  <SDestinationComboboxItem key={`${item.displayName}-${index}`} index={index} item={item}>
    <Copy color="neutrals-9" intent="detail">
      {item.displayName}
    </Copy>
  </SDestinationComboboxItem>
)
