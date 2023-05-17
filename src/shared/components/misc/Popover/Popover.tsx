import React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { CSS } from "@/stitches/config"
import { ComponentProps } from "@/stitches/types"
import { escapeKeyDown } from "@/shared/utils"

import { SPopoverContent } from "./Popover.styles"

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverClose = PopoverPrimitive.Close

export interface IPopoverContentProps
  extends ComponentProps<typeof SPopoverContent>,
    PopoverPrimitive.PopoverContentProps {
  children: React.ReactNode
  contentCss?: CSS
  close: () => void
}

export const PopoverContent = React.forwardRef<HTMLInputElement, IPopoverContentProps>(
  ({ children, close, ...props }, forwardedRef) => {
    return (
      <SPopoverContent
        tabIndex={0}
        avoidCollisions
        collisionPadding={12}
        sideOffset={8}
        ref={forwardedRef}
        onKeyDown={(e: { key: string }) => escapeKeyDown(e.key) && close()}
        {...props}
      >
        {children}
      </SPopoverContent>
    )
  },
)

PopoverContent.displayName = "PopoverContent"
