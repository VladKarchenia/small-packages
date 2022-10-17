import React from "react"
import { ComponentProps } from "@/utils"

import { SOverlay } from "./Overlay.styles"

export interface IOverlayProps extends ComponentProps<typeof SOverlay> {}

export const Overlay = (props: IOverlayProps) => {
  return <SOverlay data-testid="overlay" {...props} />
}
