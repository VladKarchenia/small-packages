import { useBoundStore } from "@/store"
import { useDashboardStateContext } from "@/dashboard/state"
import { ShippingType } from "@/shared/types"

import { SearchFilterDrawer } from "@/shared/components"
import { IconChevronLeft, IconSearch } from "@/shared/icons"
import { SearchFilterDrawerForm } from "@/dashboard/components"

export const SearchInput = () => {
  const tab = useBoundStore((state) => state.tab)
  const { searchTerm } = useDashboardStateContext()

  return (
    <SearchFilterDrawer
      drawerName="searchInput"
      drawerTitle={tab === ShippingType.Quote ? "Find a quote" : "Find a shipment"}
      value={searchTerm}
      placeholder={
        tab === ShippingType.Quote
          ? "Search for ID, address..."
          : "Search for ID, tracking number, address..."
      }
      hidePlaceholder
      closeIcon={<IconChevronLeft />}
      prefix={<IconSearch />}
      drawerForm={<SearchFilterDrawerForm comboboxType="searchTerm" />}
    />
  )
}
