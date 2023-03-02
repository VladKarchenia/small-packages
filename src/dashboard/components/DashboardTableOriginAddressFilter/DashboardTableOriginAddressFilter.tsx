import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"
import { useCombobox } from "downshift"

import { useShipmentsFieldValues } from "@/dashboard/hooks"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
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

export const DashboardTableOriginAddressFilter = () => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const { originalAddress } = useDashboardStateContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [keyword] = useDebounce(inputValue.trim(), 300)

  const { data, isLoading, isIdle, error } = useShipmentsFieldValues({
    field: "data.ORIGIN_GEOLOC.DISPLAY_NAME",
    keyword,
    status: "QUOTE",
  })

  const results = useMemo(() => (data ? data : []), [data])

  useEffect(() => {
    if (originalAddress.length === results.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [originalAddress, results])

  if (isMediumAndAbove) {
    return (
      <DesktopView
        originalAddress={originalAddress}
        inputValue={inputValue}
        setInputValue={setInputValue}
      >
        <Content
          results={results}
          isLoading={isLoading}
          isIdle={isIdle}
          error={error}
          isCheckAll={isCheckAll}
          originalAddress={originalAddress}
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
        originalAddress={originalAddress}
      />
    </MobileView>
  )
}

interface IDesktopViewProps {
  originalAddress: string[]
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const DesktopView: React.FC<React.PropsWithChildren<IDesktopViewProps>> = ({
  children,
  originalAddress,
  inputValue,
  setInputValue,
}) => {
  return (
    <DashboardTableFilter
      label="Origin address"
      name="originalAddress"
      amount={originalAddress.length}
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
      id="originAddressFilter"
      label="Origin address filter"
      placeholder="Search for origin address"
      inputValue={inputValue}
      prefix={<IconSearch />}
      clearDestinationFn={() => resetFilterField("originalAddress")}
    >
      {children}
    </MobileCombobox>
  )
}

interface IContentProps extends Omit<IResponseContentProps, "handleCheckAllClick"> {
  originalAddress: string[]
}

const Content = ({ results, originalAddress, ...props }: IContentProps) => {
  const { setOriginalAddressFilter, resetFilterField } = useDashboardActionContext()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = originalAddress.filter((address) => address !== event.currentTarget.value)
      return setOriginalAddressFilter(newArray)
    }

    const newAddress = results.find((address) => address === event.currentTarget.value)
    if (newAddress) {
      const newArray = [...originalAddress, newAddress]

      return setOriginalAddressFilter(newArray)
    }
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("originalAddress")
    }

    return setOriginalAddressFilter(results)
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
            checked={originalAddress.includes(item)}
          />
        </ResponseContentItem>
      ))}
    </ResponseContent>
  )
}
