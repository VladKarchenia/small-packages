import React from "react"
import { CSS } from "@/config"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { ModalPortal, ModalPortalProps } from "./Portal"
import { ModalOverlay } from "./Overlay"
import { ModalCloseButton, ModalCloseButtonProps } from "./CloseButton"
import { ModalHeader } from "./Header"
import { ModalFooter } from "./Footer"
import { ModalContent, ModalContentProps } from "./Content"
import { ModalPanel, ModalPanelProps } from "./Panel"

export type ModalProps = DialogPrimitive.DialogProps &
  Pick<ModalPortalProps, "container"> &
  Omit<ModalPanelProps, "css"> &
  Omit<ModalContentProps, "css"> & {
    trigger?: React.ReactNode

    contentCss?: CSS
    panelCss?: CSS

    sticky?: boolean
    title?: string

    closeButton?: ModalCloseButtonProps

    footer?: React.ReactNode
  }

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      trigger,
      container,
      align,
      gap,
      nested,
      fullscreen,
      scrollable,
      panelCss,
      contentCss,
      title,
      sticky,
      closeButton,
      footer,
      open,
      onOpenChange,
      ...props
    },
    forwardedRef,
  ) => {
    const panelProps = {
      align,
      gap,
      nested,
      fullscreen,
      css: panelCss,
    }

    const contentProps = {
      css: contentCss,
      scrollable,
      ...props,
    }

    return (
      <DialogPrimitive.Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        <ModalPortal container={container}>
          <ModalOverlay nested={nested} />

          <ModalPanel ref={forwardedRef} {...panelProps}>
            <ModalContent {...contentProps}>
              <ModalHeader title={title} sticky={sticky}>
                <ModalCloseButton {...closeButton} />
              </ModalHeader>

              {children}

              {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContent>
          </ModalPanel>
        </ModalPortal>
      </DialogPrimitive.Dialog>
    )
  },
)

Modal.displayName = "Modal"
