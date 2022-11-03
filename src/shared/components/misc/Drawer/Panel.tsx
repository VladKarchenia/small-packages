import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { ComponentProps } from "@/utils"

import { SDrawerPanel } from "./Panel.styles"

export type DrawerPanelProps = DialogPrimitive.DialogContentProps &
  ComponentProps<typeof SDrawerPanel> & {
    offset?: number
  }

export const DrawerPanel = forwardRef<HTMLDivElement, DrawerPanelProps>(
  ({ offset, ...props }, forwardedRef) => {
    return <SDrawerPanel ref={forwardedRef} style={{ top: offset }} {...props} />
  },
)

DrawerPanel.displayName = "DrawerPanel"
