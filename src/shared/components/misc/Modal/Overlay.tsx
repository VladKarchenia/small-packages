import React, { forwardRef } from "react"
import { ComponentProps } from "@/utils/types"
import type { DialogOverlayProps } from "@radix-ui/react-dialog"
import { SModalOverlay } from "./Overlay.styles"

export type ModalOverlayProps = DialogOverlayProps & ComponentProps<typeof SModalOverlay>

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => (
  <SModalOverlay ref={ref} {...props} />
))

ModalOverlay.displayName = "ModalOverlay"
