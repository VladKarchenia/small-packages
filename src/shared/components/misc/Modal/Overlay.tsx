import React, { forwardRef } from "react"
import type { DialogOverlayProps } from "@radix-ui/react-dialog"
import { ComponentProps } from "@/utils"

import { SModalOverlay } from "./Overlay.styles"

export type ModalOverlayProps = DialogOverlayProps & ComponentProps<typeof SModalOverlay>

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => (
  <SModalOverlay ref={ref} data-testid="modal-overlay" {...props} />
))

ModalOverlay.displayName = "ModalOverlay"
