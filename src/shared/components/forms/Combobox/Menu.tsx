import React, { memo } from "react"
import { useComboboxContext } from "./Combobox"

export interface ComboboxMenuProps {
  className?: string
  children: React.ReactNode
}

export const ComboboxMenu = memo(function ({ className, children }: ComboboxMenuProps) {
  const { getMenuProps, isOpen } = useComboboxContext("ComboboxMenu")

  return (
    <div className={className} data-ui="combobox-menu" {...getMenuProps()}>
      {isOpen && children}
    </div>
  )
})

ComboboxMenu.displayName = "ComboboxMenu"
