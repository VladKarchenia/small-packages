import React from "react"

import { ComponentProps } from "@/stitches/types"

import { SBaseIllustration } from "./Illustration.styles"

export interface IIllustrationProps extends ComponentProps<typeof SBaseIllustration> {
  dataTestId?: string

  scribble?: boolean
}

export const BaseIllustration: React.FC<IIllustrationProps> = ({
  children,
  dataTestId,
  ...props
}) => (
  <SBaseIllustration {...props} data-testid={dataTestId}>
    {children}
  </SBaseIllustration>
)
