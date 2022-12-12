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
} from "./DestinationAddressFilterCombobox.styles"
import { IAddress } from "@/shared/state"

const addressesMockList: IAddress[] = [
  {
    location: "USA, New York",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  {
    location: "USA, 101 AMSTERDAM AVE STATEN ISLAND ROCKET ANTA",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  {
    location: "USA, 75 PARK PLACE 8TH FLOOR NEW YORK CITY",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  {
    location: "USA, 620 12TH AVENUE, NEW YORK NY 100 STREET PARK",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  {
    location: "USA, 201 AVE STATEN AMSTERDAM ISLAND ROCKET ANTA",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  {
    location: "USA, 775 9TH SUPER PLACE 8TH FLOOR NEW YORK CITY",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
]

// interface ISearchFilterComboboxProps {
//   onSelect: (value: string, label: string) => void
//   initialValue?: string
//   placeholder: string
// }

export const DestinationAddressFilterCombobox = () => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)
  const { destinationAddress } = useDashboardStateContext()
  const { setDestinationAddressFilter, resetFilterField } = useDashboardActionContext()
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
      const newArray = destinationAddress.filter(
        (address) => address.location !== event.currentTarget.value,
      )
      return setDestinationAddressFilter(newArray)
    }

    const newAddress = addressesMockList.find(
      (address) => address.location === event.currentTarget.value,
    )
    if (newAddress) {
      const newArray = [...destinationAddress, newAddress]

      return setDestinationAddressFilter(newArray)
    }
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("destinationAddress")
    }

    return setDestinationAddressFilter(addressesMockList)
  }

  useEffect(() => {
    if (destinationAddress.length === addressesMockList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [destinationAddress])

  return (
    <Combobox {...comboboxProps}>
      <Box css={{ paddingX: "$16" }}>
        <ComboboxInput ref={inputRef}>
          <FormInput
            id={t("filters.destination")}
            label={t("filters.destination")}
            placeholder={"Search for destination address"}
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

        {addressesMockList.map((item) => (
          <>
            <Box
              key={item.location}
              css={{
                "> label": {
                  padding: "$12 $16",
                  cursor: "pointer",
                  hover: {
                    backgroundColor: "$neutrals-3",
                  },
                },
              }}
            >
              <FormCheckbox
                value={item.location}
                onChange={handleChange}
                name={item.location}
                id={item.location}
                label={item.location}
                checked={destinationAddress.some((address) => address.location === item.location)}
              />
            </Box>
            <Divider />
          </>
        ))}
      </SSearchFilterComboboxMenu>
    </Combobox>
  )
}
