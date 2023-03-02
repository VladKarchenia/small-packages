import React, { memo } from "react"

import { SDropdownMenuRadioGroup } from "./Dropdown.styles"

export interface IDropdownRadioGroupProps {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
}

export const DropdownRadioGroup = memo(function ({
  children,
  value,
  onValueChange,
}: IDropdownRadioGroupProps) {
  return (
    <SDropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
      {children}
    </SDropdownMenuRadioGroup>
  )
})

DropdownRadioGroup.displayName = "DropdownRadioGroup"
