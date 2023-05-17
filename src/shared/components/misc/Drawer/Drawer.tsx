import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { CSS } from "@/stitches/config"

import { DrawerPortal, DrawerPortalProps } from "./Portal"
import { DrawerOverlay } from "./Overlay"
import { DrawerPanel, DrawerPanelProps } from "./Panel"
import { DrawerContent, DrawerContentProps } from "./Content"
import { DrawerHeader } from "./Header"

export type DrawerProps = DialogPrimitive.DialogProps &
  Pick<DrawerPortalProps, "container"> &
  Omit<DrawerPanelProps, "css"> &
  Omit<DrawerContentProps, "css"> & {
    trigger: React.ReactNode

    title?: React.ReactNode

    header?: React.ReactNode
    footer?: React.ReactNode

    panelCss?: CSS
    contentCss?: CSS

    closeIcon?: React.ReactNode
    hasSeparator?: boolean
  }

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      trigger,
      container,
      header,
      nested,
      offset,
      fullWidth,
      scrollable,
      direction,
      closeIcon,
      hasSeparator,
      panelCss,
      contentCss,
      open,
      onOpenChange,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <DialogPrimitive.Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        <DrawerPortal container={container}>
          <DrawerOverlay nested={nested} offset={offset} />

          <DrawerPanel
            ref={forwardedRef}
            css={panelCss}
            fullWidth={fullWidth}
            nested={nested}
            offset={offset}
            scrollable={scrollable}
            direction={direction}
          >
            {header ? (
              <DrawerHeader closeIcon={closeIcon} hasSeparator={hasSeparator}>
                {header}
              </DrawerHeader>
            ) : null}

            <DrawerContent css={contentCss} {...props}>
              {children}
            </DrawerContent>
          </DrawerPanel>
        </DrawerPortal>
      </DialogPrimitive.Dialog>
    )
  },
)

Drawer.displayName = "Drawer"
