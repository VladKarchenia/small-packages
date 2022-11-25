import { IconBin } from "@/shared/icons"
import React from "react"
import { SFilterIconBox } from "./SortFilterBarPreview.styles"

export interface ISortFilterBarPreviewProps {
  isFilterApplied: boolean
  onClick?: (event: unknown) => void
}

export const SortFilterBarPreview = React.forwardRef<HTMLInputElement, ISortFilterBarPreviewProps>(
  ({ isFilterApplied, onClick }, ref) => {
    return (
      <SFilterIconBox type="button" selected={isFilterApplied} onClick={onClick}>
        <IconBin fixedSize width={20} height={20} />
      </SFilterIconBox>
    )
  },
)

SortFilterBarPreview.displayName = "SortFilterBarPreview"
