import React from "react"

import { SearchFilterDrawer } from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { SortFiltertForm } from "./SortFilterForm"

export interface ISortFilterBarProps {
  isFilterApplied: boolean
}

export const SortFilterBar: React.FC<ISortFilterBarProps> = ({ isFilterApplied }) => {
  return (
    <SearchFilterDrawer
      drawerName="sortFilterBar"
      drawerTitle="Sort and Filter"
      closeIcon={<IconCross />}
      triggerIcon
      isFilterApplied={isFilterApplied}
      drawerForm={<SortFiltertForm />}
    />
  )
}
