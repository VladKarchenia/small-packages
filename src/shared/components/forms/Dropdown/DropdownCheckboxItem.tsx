import { memo } from "react"
import { FormCheckbox } from "@/shared/components"

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
    <FormCheckbox
      value={value}
      onChange={onSelect}
      name={label}
      id={label}
      label={label}
      checked={false}
    />
  )
})

DropdownCheckboxItem.displayName = "DropdownCheckboxItem"
