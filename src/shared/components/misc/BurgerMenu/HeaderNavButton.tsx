import React from "react"
import { ComponentProps } from "@/utils/types"

import { SHeaderNavButton } from "./HeaderNavButton.styles"

export interface IHeaderNavButtonProps extends ComponentProps<typeof SHeaderNavButton> {
  href?: string
  target?: string
  rel?: string
}

export const HeaderNavButton = React.forwardRef<HTMLButtonElement, IHeaderNavButtonProps>(
  (props, ref) => <SHeaderNavButton ref={ref} type="button" {...props} />,
)

HeaderNavButton.displayName = "HeaderNavButton"
