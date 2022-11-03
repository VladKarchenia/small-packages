import React, { memo } from "react"

import { ComboboxItemFormat, useComboboxContext } from "./Combobox"

export interface ComboboxItemProps {
  className?: string
  children: React.ReactNode

  index: number
  item: ComboboxItemFormat
}

export const ComboboxItem = memo(function ({
  className,
  children,
  index,
  item,
}: ComboboxItemProps) {
  const { getItemProps, highlightedIndex } = useComboboxContext("ComboboxItem")

  const isHighlighted = highlightedIndex === index

  return (
    <li
      className={className}
      data-ui="combobox-item"
      data-state={isHighlighted ? "highlighted" : ""}
      {...getItemProps({ index, item })}
    >
      {children}
    </li>
  )
})

ComboboxItem.displayName = "ComboboxItem"
