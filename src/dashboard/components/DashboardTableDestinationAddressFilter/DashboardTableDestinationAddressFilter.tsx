import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"
import { useCombobox } from "downshift"

import { useShipmentsFieldValues } from "@/dashboard/hooks"
import { useBoundStore } from "@/store"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { ShippingType } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import {
  Box,
  FormCheckbox,
  FormInput,
  IResponseContentProps,
  MobileCombobox,
  ResponseContent,
  ResponseContentItem,
} from "@/shared/components"
import { IconSearch } from "@/shared/icons"
import { DashboardTableFilter } from "@/dashboard/components"

export const DashboardTableDestinationAddressFilter = () => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const tab = useBoundStore((state) => state.tab)
  const { destinationAddress } = useDashboardStateContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [keyword] = useDebounce(inputValue.trim(), 300)

  const { data, isLoading, isIdle, error } = useShipmentsFieldValues({
    field: "data.CONSIGNEE_GEOLOC.DISPLAY_NAME",
    keyword,
    status: tab === ShippingType.Quote ? "QUOTE" : "SHIPMENT",
  })

  const results = useMemo(() => (data ? data : []), [data])

  useEffect(() => {
    if (destinationAddress.length === results.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [destinationAddress, results])

  if (isMediumAndAbove) {
    return (
      <DesktopView
        destinationAddress={destinationAddress}
        inputValue={inputValue}
        setInputValue={setInputValue}
      >
        <Content
          results={results}
          isLoading={isLoading}
          isIdle={isIdle}
          error={error}
          isCheckAll={isCheckAll}
          destinationAddress={destinationAddress}
        />
      </DesktopView>
    )
  }

  return (
    <MobileView results={results} inputValue={inputValue} setInputValue={setInputValue}>
      <Content
        results={results}
        isLoading={isLoading}
        isIdle={isIdle}
        error={error}
        isCheckAll={isCheckAll}
        destinationAddress={destinationAddress}
      />
    </MobileView>
  )
}

interface IDesktopViewProps {
  destinationAddress: string[]
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const DesktopView: React.FC<React.PropsWithChildren<IDesktopViewProps>> = ({
  children,
  destinationAddress,
  inputValue,
  setInputValue,
}) => {
  return (
    <DashboardTableFilter
      label="Destination address"
      name="destinationAddress"
      amount={destinationAddress.length}
    >
      <Box css={{ padding: "$12 $16" }}>
        <FormInput
          value={inputValue}
          label="Search for address"
          labelProps={{ hidden: true }}
          placeholder="Search for address"
          onChange={(event) => setInputValue(event.target.value)}
          suffix={<IconSearch />}
        />
      </Box>

      {children}
    </DashboardTableFilter>
  )
}

interface IMobileViewProps {
  results: string[]
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const MobileView: React.FC<React.PropsWithChildren<IMobileViewProps>> = ({
  children,
  results,
  inputValue,
  setInputValue,
}) => {
  const { resetFilterField } = useDashboardActionContext()

  const comboboxProps = useCombobox({
    isOpen: true,
    inputValue,
    items: results,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "")
    },
  })

  return (
    <MobileCombobox
      comboboxProps={comboboxProps}
      id="destinationAddressFilter"
      label="Destination address filter"
      placeholder="Search for destination address"
      inputValue={inputValue}
      prefix={<IconSearch />}
      clearDestinationFn={() => resetFilterField("destinationAddress")}
    >
      {children}
    </MobileCombobox>
  )
}

interface IContentProps extends Omit<IResponseContentProps, "handleCheckAllClick"> {
  destinationAddress: string[]
}

const Content = ({ results, destinationAddress, ...props }: IContentProps) => {
  const { setDestinationAddressFilter, resetFilterField } = useDashboardActionContext()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = destinationAddress.filter((address) => address !== event.currentTarget.value)
      return setDestinationAddressFilter(newArray)
    }

    const newAddress = results.find((address) => address === event.currentTarget.value)
    if (newAddress) {
      const newArray = [...destinationAddress, newAddress]

      return setDestinationAddressFilter(newArray)
    }
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("destinationAddress")
    }

    return setDestinationAddressFilter(results)
  }

  return (
    <ResponseContent results={results} handleCheckAllClick={handleCheckAllClick} {...props}>
      {results.map((item) => (
        <ResponseContentItem key={item}>
          <FormCheckbox
            value={item}
            onChange={handleChange}
            name={item}
            id={item}
            label={item}
            checked={destinationAddress.includes(item)}
          />
        </ResponseContentItem>
      ))}
    </ResponseContent>
  )
}
