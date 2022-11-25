import React from "react"
import { ComponentProps } from "@/utils"

import { SHeaderNav } from "./Header.styles"

interface IHeaderNavWrapperProps extends ComponentProps<typeof SHeaderNav> {}

export const HeaderNavWrapper = React.forwardRef<HTMLElement, IHeaderNavWrapperProps>(
  ({ children, ...props }, ref) => (
    <SHeaderNav {...props} ref={ref}>
      {children}
    </SHeaderNav>
  ),
)

HeaderNavWrapper.displayName = "HeaderNavWrapper"
