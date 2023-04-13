import { useEffect, useMemo, useState } from "react"
import { isAxiosError } from "axios"
import { useCombobox } from "downshift"
import { useDebounce } from "use-debounce"

import { IAddress } from "@/shared/types"
import { IPlaceResponse } from "@/api/types"
import { useSearchPlaces } from "@/shipment/hooks"
import { transformLocation } from "@/shipment/utils"

import { Box, ComboboxGroup, Copy, Flex, MobileCombobox, Spinner } from "@/shared/components"

import { SDestinationComboboxItem } from "./DestinationCombobox.styles"

export interface DestinationComboboxProps {
  onSelect: (locationDetails: IAddress) => void
  initialValue: IAddress
  id: string
  label: string
  placeholder?: string
  country: string
  person: "sender" | "recipient"
}

export const DestinationCombobox = ({
  onSelect,
  initialValue,
  id,
  label,
  placeholder,
  country,
  person,
}: DestinationComboboxProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [input] = useDebounce(inputValue.trim(), 300)

  const { data, isLoading, isIdle, error } = useSearchPlaces({
    input,
    country,
    keyword: input,
  })

  const results = useMemo(() => {
    const result: IAddress[] = []

    if (data && data.content.length > 0) {
      data.content
        .filter((item: IPlaceResponse) => !!item.city && !!item.zipCode)
        .map((item: IPlaceResponse) => result.push(transformLocation({ ...item, person })))
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    items: results,
    itemToString: (item: IAddress | null) => item?.displayName || "",

    onInputValueChange: ({ inputValue }) => setInputValue(inputValue || ""),

    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect(selectedItem)
      }
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
      <Box
        css={{
          height: "100%",
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
  }, [initialValue.displayName])

  return (
    <MobileCombobox
      comboboxProps={comboboxProps}
      id={id}
      label={label}
      placeholder={placeholder}
      inputValue={inputValue}
    >
      <Content />
    </MobileCombobox>
  )
}

interface IDestinationSectionProps {
  items: IAddress[]
}

function DestinationSection({ items }: IDestinationSectionProps) {
  return (
    <ComboboxGroup labelledBy="combobox-group">
      {items.map((item, index) => (
        <DestinationBox item={item} index={index} key={`combobox-${index}`} />
      ))}
    </ComboboxGroup>
  )
}

const DestinationBox = ({ item, index }: { item: IAddress; index: number }) => (
  <SDestinationComboboxItem key={`${item.displayName}-${index}`} index={index} item={item}>
    <Copy>{item.displayName}</Copy>
  </SDestinationComboboxItem>
)
