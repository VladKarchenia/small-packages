import React, { memo } from "react"

export interface ComboboxGroupProps {
  children: React.ReactNode

  className?: string
  labelledBy?: string
}

export const ComboboxGroup = memo(function ({
  className,
  children,
  labelledBy,
}: ComboboxGroupProps) {
  return (
    <ul className={className} aria-labelledby={labelledBy} data-ui="combobox-group">
      {children}
    </ul>
  )
})

ComboboxGroup.displayName = "ComboboxGroup"
