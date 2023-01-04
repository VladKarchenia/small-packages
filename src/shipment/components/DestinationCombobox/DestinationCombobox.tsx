import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCombobox } from "downshift"
import { Combobox, ComboboxGroup, ComboboxInput, Copy, FormInput, Stack } from "@/shared/components"
import { IconCross } from "@/shared/icons"
import {
  SDestinationComboboxItem,
  SDestinationComboboxMenu,
  SComboboxClearButton,
} from "./DestinationCombobox.styles"
import { useQuery } from "react-query"
import { IAddress } from "@/shared/types"
import debounce from "just-debounce-it"
import { searchPlacesFn } from "@/api/placeApi"
import { IPlaceResponse } from "@/api/types"

export interface DestinationComboboxProps {
  onSelect: (locationDetails: IAddress) => void
  initialValue: IAddress
  placeholder?: string
  country: string
}

export const DestinationCombobox = ({
  onSelect,
  initialValue,
  placeholder,
  country,
}: DestinationComboboxProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>(initialValue.displayName)
  const [locations, setLocations] = useState<IPlaceResponse[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const { isLoading, isFetching, refetch } = useQuery(
    ["searchPlaces"],
    () =>
      searchPlacesFn({
        country: country,
        keyword: inputValue,
        organizationId: user?.activeOrganizationId,
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

        setLocations(result)
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
    items: locations,
    itemToString: (item: IPlaceResponse | null) => item?.displayName || "",

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
      setLocations([])

      if (!inputValue || inputValue.length < 3 || inputValue.trim().length === 0) return

      if (inputValue.length > 3) {
        debouncedRefetch()
      }
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return

      onSelect(selectedItem)
      setTimeout(clearDestination, 400)
    },
  })

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    setLocations([])
    inputRef.current?.focus()
  }, [comboboxProps])

  useEffect(() => {
    setInputValue(initialValue.displayName)

    if (initialValue.displayName.length > 3) {
      refetch()
    }
  }, [initialValue.displayName, refetch])

  return (
    <Combobox {...comboboxProps}>
      <ComboboxInput ref={inputRef}>
        <FormInput
          id={placeholder}
          label={placeholder}
          placeholder={placeholder}
          labelProps={{ hidden: true }}
          autoCorrect="off"
          autoComplete="off"
          data-testid="displayName-input"
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
      <SDestinationComboboxMenu>
        {isLoading || isFetching ? (
          <div>loading</div>
        ) : (
          <Stack space={24}>
            <DestinationSection items={locations} />
          </Stack>
        )}
      </SDestinationComboboxMenu>
    </Combobox>
  )
}

interface IDestinationSectionProps {
  items: IPlaceResponse[]
}

function DestinationSection({ items }: IDestinationSectionProps) {
  if (!items.length) return null

  return (
    <ComboboxGroup labelledBy={"destination-group"}>
      {items.map((item, index) => {
        return <DestinationBox item={item} index={index} key={`recent-destination-${index}`} />
      })}
    </ComboboxGroup>
  )
}

const DestinationBox = ({ item, index }: { item: IPlaceResponse; index: number }) => {
  return (
    <SDestinationComboboxItem key={`${item.displayName}-${index}`} index={index} item={item}>
      <Copy color="neutrals-9" intent="detail">
        {item.displayName}
      </Copy>
    </SDestinationComboboxItem>
  )
}
