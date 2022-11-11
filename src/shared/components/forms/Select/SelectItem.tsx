import React from "react"
import { ItemText } from "@radix-ui/react-select"
import { IconTick } from "@/shared/icons"
import { SSelectItem, SSelectItemIndicator } from "./Select.styles"

export interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SSelectItem {...props} ref={forwardedRef}>
        <ItemText>{children}</ItemText>
        <SSelectItemIndicator>
          <IconTick />
        </SSelectItemIndicator>
      </SSelectItem>
    )
  },
)

SelectItem.displayName = "SelectItem"
