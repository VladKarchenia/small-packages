import React, { forwardRef } from "react"
import type { DialogOverlayProps } from "@radix-ui/react-dialog"

import { ComponentProps } from "@/stitches/types"

import { SModalOverlay } from "./Overlay.styles"

type ModalOverlayProps = DialogOverlayProps & ComponentProps<typeof SModalOverlay>

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => (
  <SModalOverlay ref={ref} {...props} />
))

ModalOverlay.displayName = "ModalOverlay"
