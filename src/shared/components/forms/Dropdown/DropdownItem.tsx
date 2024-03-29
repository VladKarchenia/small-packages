import React, { memo } from "react"

import { Copy } from "@/shared/components"

import { SDropdownMenuItem } from "./Dropdown.styles"

export interface IDropdownItemProps {
  label: string
  dataTestid?: string
  onSelect?: (event: Event) => void
}

export const DropdownItem = memo(function ({ label, onSelect, dataTestid }: IDropdownItemProps) {
  return (
    <SDropdownMenuItem onSelect={onSelect} data-testid={dataTestid}>
      <Copy
        as="span"
        color="theme-b-n3"
        css={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          minWidth: "$128",
          height: "inherit",
          paddingX: "$20",
        }}
      >
        {label}
      </Copy>
    </SDropdownMenuItem>
  )
})

DropdownItem.displayName = "DropdownItem"
