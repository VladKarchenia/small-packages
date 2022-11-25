import React from "react"
import { SearchFilterDrawer } from "@/shared/components"
import { IconCross } from "@/shared/icons"
import { ShippingType } from "@/shipment"
import { SortFiltertForm } from "./SortFilterForm"

export interface ISortFilterBarProps {
  isFilterApplied: boolean
  shippingType: ShippingType
}

export const SortFilterBar: React.FC<ISortFilterBarProps> = ({ isFilterApplied, shippingType }) => {
  return (
    <SearchFilterDrawer
      drawerName="sortFilterBar"
      drawerTitle="Sort and Filter"
      closeIcon={<IconCross />}
      triggerIcon
      isFilterApplied={isFilterApplied}
      drawerForm={<SortFiltertForm shippingType={shippingType} />}
    />
  )
}
