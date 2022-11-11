import React, { memo } from "react"
import { Copy } from "@/shared/components"
import { IconTick } from "@/shared/icons"
import { SDropdownMenuItemIndicator, SDropdownMenuRadioItem } from "./Dropdown.styles"

export interface IDropdownRadioItemProps {
  value: string
  label: string
  selected: boolean
}

export const DropdownRadioItem = memo(function ({
  value,
  label,
  selected,
}: IDropdownRadioItemProps) {
  return (
    <SDropdownMenuRadioItem value={value}>
      <Copy
        as="span"
        color="neutrals-9"
        scale={8}
        bold={selected}
        css={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "inherit",
          paddingLeft: "$24",
          paddingRight: "$48",
        }}
      >
        {label}
      </Copy>
      <SDropdownMenuItemIndicator>
        <IconTick />
      </SDropdownMenuItemIndicator>
    </SDropdownMenuRadioItem>
  )
})

DropdownRadioItem.displayName = "DropdownRadioItem"
