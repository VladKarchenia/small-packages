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

export const DashboardTableNameFilter = () => {
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const { recipientName } = useDashboardStateContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")

  const [keyword] = useDebounce(inputValue.trim(), 300)

  const { data, isLoading, isIdle, error } = useShipmentsFieldValues({
    field: "data.CONSIGNEE_CONTACT",
    keyword,
    status: "SHIPMENT",
  })

  const results = useMemo(() => (data ? data : []), [data])

  useEffect(() => {
    if (recipientName.length === results.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [recipientName, results])

  if (isMediumAndAbove) {
    return (
      <DesktopView
        recipientName={recipientName}
        inputValue={inputValue}
        setInputValue={setInputValue}
      >
        <Content
          results={results}
          isLoading={isLoading}
          isIdle={isIdle}
          error={error}
          isCheckAll={isCheckAll}
          recipientName={recipientName}
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
        recipientName={recipientName}
      />
    </MobileView>
  )
}

interface IDesktopViewProps {
  recipientName: string[]
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const DesktopView: React.FC<React.PropsWithChildren<IDesktopViewProps>> = ({
  children,
  recipientName,
  inputValue,
  setInputValue,
}) => {
  return (
    <DashboardTableFilter label="Recipient name" name="recipientName" amount={recipientName.length}>
      <Box css={{ padding: "$12 $16" }}>
        <FormInput
          value={inputValue}
          label="Search for recipient's name"
          labelProps={{ hidden: true }}
          placeholder="Search for recipient's name"
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
      id="recipientNameFilter"
      label="Recipient name filter"
      placeholder="Search for recipient's name"
      inputValue={inputValue}
      prefix={<IconSearch />}
      clearDestinationFn={() => resetFilterField("recipientName")}
    >
      {children}
    </MobileCombobox>
  )
}

interface IContentProps extends Omit<IResponseContentProps, "handleCheckAllClick"> {
  recipientName: string[]
}

const Content = ({ results, recipientName, ...props }: IContentProps) => {
  const { setRecipientNameFilter, resetFilterField } = useDashboardActionContext()

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
            checked={recipientName.includes(item)}
          />
        </ResponseContentItem>
      ))}
    </ResponseContent>
  )
}
