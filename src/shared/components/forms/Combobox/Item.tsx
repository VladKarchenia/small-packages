import React, { memo } from "react"

import { useComboboxContext } from "./Combobox"

interface IComboboxItemProps {
  className?: string
  children: React.ReactNode
  index: number
  item: any
}

export const ComboboxItem = memo(function ({
  className,
  children,
  index,
  item,
}: IComboboxItemProps) {
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
