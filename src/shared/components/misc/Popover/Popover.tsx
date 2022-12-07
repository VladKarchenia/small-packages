import React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ComponentProps } from "@/utils"
import { CSS } from "@/config"

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
}

export const PopoverContent = React.forwardRef<HTMLInputElement, IPopoverContentProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SPopoverContent
        avoidCollisions
        collisionPadding={24}
        sideOffset={8}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </SPopoverContent>
    )
  },
)

PopoverContent.displayName = "PopoverContent"
