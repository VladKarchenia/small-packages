import React from "react"
import { SearchFilterDrawer, useDrawerActions } from "@/shared/components"
import { IconCross } from "@/shared/icons"
import { SFilterIcon } from "./SortFilterBar.styles"
import { SortFiltertForm } from "./SortFilterForm"

export interface ISortFilterBarProps {
  isFilterApplied: boolean
}

export const SortFilterBar: React.FC<ISortFilterBarProps> = ({ isFilterApplied }) => {
  const { close } = useDrawerActions()

  const handleChange = (location: string) => {
    close("sortFilterBar")
  }

  return (
    <SearchFilterDrawer
      drawerName="sortFilterBar"
      drawerTitle="Sort and Filter"
      closeIcon={<IconCross />}
      trigger={
        <SFilterIcon
          fixedSize
          width={20}
          height={20}
          selected={isFilterApplied}
          css={{ display: "flex" }}
        />
      }
      drawerForm={<SortFiltertForm />}
    />
  )
}
