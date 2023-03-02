import React from "react"
import { Portal, Root } from "@radix-ui/react-dropdown-menu"

import { CSS } from "@/stitches/config"

import { SDropdownMenuContent, SDropdownMenuTrigger } from "./Dropdown.styles"

export interface IDropdownProps {
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open?: boolean) => void
  disabled?: boolean
  asChild?: boolean
  contentCss?: CSS
  triggerCss?: CSS
}

export const Dropdown: React.FC<React.PropsWithChildren<IDropdownProps>> = ({
  children,
  trigger,
  open,
  onOpenChange,
  disabled,
  asChild = false,
  contentCss,
  triggerCss,
}) => {
  return (
    <Root open={open} onOpenChange={onOpenChange} modal={false}>
      <SDropdownMenuTrigger asChild={asChild} disabled={disabled} css={triggerCss}>
        {trigger}
      </SDropdownMenuTrigger>
      <Portal>
        <SDropdownMenuContent
          avoidCollisions
          collisionPadding={16}
          css={contentCss}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {children}
        </SDropdownMenuContent>
      </Portal>
    </Root>
  )
}
