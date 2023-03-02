import React from "react"

import { IconFilter } from "@/shared/icons"

import { SFilterIconBox } from "./SortFilterBarPreview.styles"

export interface ISortFilterBarPreviewProps {
  isFilterApplied: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const SortFilterBarPreview = React.forwardRef<HTMLInputElement, ISortFilterBarPreviewProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isFilterApplied, onClick }, ref) => {
    return (
      <SFilterIconBox type="button" selected={isFilterApplied} onClick={onClick}>
        <IconFilter css={{ color: "$neutrals-7" }} />
      </SFilterIconBox>
    )
  },
)

SortFilterBarPreview.displayName = "SortFilterBarPreview"
