import { SearchFilterDrawer, SearchFilterDrawerForm } from "@/shared/components"
import { IconArrowLeft, IconSearch } from "@/shared/icons"
import { useDashboardStateContext } from "@/dashboard/state"
import { ShippingType } from "@/shipment"

export const SearchInput = () => {
  const { searchTerm, shippingType } = useDashboardStateContext()

  return (
    <SearchFilterDrawer
      drawerName="searchInput"
      drawerTitle={shippingType === ShippingType.Quote ? "Find a quote" : "Find a shipment"}
      value={searchTerm}
      placeholder={
        shippingType === ShippingType.Quote
          ? "Search for ID, address..."
          : "Search for ID, tracking number, address..."
      }
      hidePlaceholder
      closeIcon={<IconArrowLeft />}
      prefix={<IconSearch fixedSize width={20} height={20} />}
      drawerForm={<SearchFilterDrawerForm comboboxType="searchTerm" />}
    />
  )
}
