import React from "react"
import { Portal, Root } from "@radix-ui/react-dropdown-menu"
import { SDropdownMenuContent, SDropdownMenuTrigger } from "./Dropdown.styles"

export interface IDropdownProps {
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open?: boolean) => void
  disabled?: boolean
  asChild?: boolean
}

export const Dropdown: React.FC<React.PropsWithChildren<IDropdownProps>> = ({
  children,
  trigger,
  open,
  onOpenChange,
  disabled,
  asChild = false,
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange} modal={false}>
      <SDropdownMenuTrigger asChild={asChild} disabled={disabled}>
        {trigger}
      </SDropdownMenuTrigger>
      <Portal>
        <SDropdownMenuContent avoidCollisions collisionPadding={24}>
          {children}
        </SDropdownMenuContent>
      </Portal>
    </Root>
  )
}
