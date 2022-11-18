import React, { memo } from "react"
import { Copy } from "@/shared/components"
import { SDropdownMenuItem } from "./Dropdown.styles"

export interface IDropdownItemProps {
  label: string
  testId?: string
  onSelect?: () => void
}

export const DropdownItem = memo(function ({ label, onSelect, testId }: IDropdownItemProps) {
  return (
    <SDropdownMenuItem onSelect={onSelect} data-testid={testId}>
      <Copy
        as="span"
        color="neutrals-9"
        scale={8}
        css={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          minWidth: "$128",
          height: "inherit",
          paddingX: "$20",
          cursor: "pointer",
        }}
      >
        {label}
      </Copy>
    </SDropdownMenuItem>
  )
})

DropdownItem.displayName = "DropdownItem"
