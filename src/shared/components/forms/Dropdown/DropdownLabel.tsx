import React, { memo } from "react"
import { Box, Copy, Divider, Spacer } from "@/shared/components"
import { SDropdownMenuLabel } from "./Dropdown.styles"

export interface IDropdownLabelProps {
  children: React.ReactNode
}

export const DropdownLabel = memo(function ({ children }: IDropdownLabelProps) {
  return (
    <SDropdownMenuLabel>
      <Box css={{ paddingX: "$24" }}>
        <Copy as="span" scale={8}>
          {children}
        </Copy>
        <Spacer size={16} />
        <Divider />
        <Spacer size={8} />
      </Box>
    </SDropdownMenuLabel>
  )
})

DropdownLabel.displayName = "DropdownLabel"
