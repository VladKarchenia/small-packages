import { useState } from "react"
import { SearchFilterDrawer, SearchFilterDrawerForm, useDrawerActions } from "@/shared/components"
import { IconArrowLeft, IconSearch } from "@/shared/icons"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

export interface LocationInputProps {
  placeholder: string
}

export const SearchInput: React.FC<LocationInputProps> = ({ placeholder }) => {
  const { searchTerm } = useDashboardStateContext()
  const { setSearchTerm } = useDashboardActionContext()
  const { close } = useDrawerActions()

  const [searchValue, setSearchValue] = useState<string>(searchTerm)

  const handleChange = (value: string) => {
    setSearchTerm(value)
    setSearchValue(value)

    close("searchInput")
  }

  return (
    <SearchFilterDrawer
      drawerName="searchInput"
      drawerTitle="Find destination"
      value={searchValue}
      placeholder={placeholder}
      closeIcon={<IconArrowLeft />}
      prefix={<IconSearch fixedSize width={20} height={20} />}
      drawerForm={
        <SearchFilterDrawerForm
          initialValue={searchValue}
          onSelect={handleChange}
          comboboxType="string"
          placeholder={placeholder}
        />
      }
    />
  )
}
