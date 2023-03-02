import React, { memo } from "react"

import { useComboboxContext } from "./Combobox"

interface IComboboxItemProps {
  className?: string
  children: React.ReactNode
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
}

export const ComboboxItem = memo(function ({
  className,
  children,
  index,
  item,
}: IComboboxItemProps) {
  const { getItemProps } = useComboboxContext("ComboboxItem")

  return (
    <li className={className} data-ui="combobox-item" {...getItemProps({ index, item })}>
      {children}
    </li>
  )
})

ComboboxItem.displayName = "ComboboxItem"
