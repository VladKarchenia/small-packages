import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { ComponentProps } from "@/utils"

import { SDrawerOverlay } from "./Overlay.styles"

type DrawerOverlayProps = DialogPrimitive.DialogOverlayProps &
  ComponentProps<typeof SDrawerOverlay> & {
    offset?: number
  }

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ offset, ...props }, forwardedRef) => (
    <SDrawerOverlay ref={forwardedRef} style={{ top: offset }} {...props} />
  ),
)

DrawerOverlay.displayName = "DrawerOverlay"
