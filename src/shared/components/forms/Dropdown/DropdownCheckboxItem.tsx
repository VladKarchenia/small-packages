import React, { memo } from "react"
import { Copy, FormCheckbox } from "@/shared/components"
import { IconTick } from "@/shared/icons"
// import { SDropdownMenuItemIndicator, SDropdownMenuCheckboxItem } from "./Dropdown.styles"

export interface IDropdownCheckboxItemProps {
  value: string
  label: string
  onSelect: () => void
}

export const DropdownCheckboxItem = memo(function ({
  value,
  label,
  onSelect,
}: IDropdownCheckboxItemProps) {
  return (
    // <SDropdownMenuCheckboxItem>
    <FormCheckbox
      // key={item}
      value={value}
      onChange={onSelect}
      name={label}
      id={label}
      label={label}
      checked={false}
    />
    // </SDropdownMenuCheckboxItem>
  )
})

DropdownCheckboxItem.displayName = "DropdownCheckboxItem"
