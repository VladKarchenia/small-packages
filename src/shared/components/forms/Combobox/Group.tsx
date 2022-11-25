import React, { memo } from "react"

interface IComboboxGroupProps {
  children: React.ReactNode

  className?: string
  labelledBy?: string
}

export const ComboboxGroup = memo(function ({
  className,
  children,
  labelledBy,
}: IComboboxGroupProps) {
  return (
    <ul className={className} aria-labelledby={labelledBy} data-ui="combobox-group">
      {children}
    </ul>
  )
})

ComboboxGroup.displayName = "ComboboxGroup"
