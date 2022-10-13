import React from "react"
import { ComponentProps } from "@/utils"
import { SHeaderNav } from "./Header.styles"

export interface IHeaderNavWrapper extends ComponentProps<typeof SHeaderNav> {}

export const HeaderNavWrapper = React.forwardRef<HTMLElement, IHeaderNavWrapper>(
  ({ children, ...props }, ref) => (
    <SHeaderNav {...props} ref={ref}>
      {children}
    </SHeaderNav>
  ),
)

HeaderNavWrapper.displayName = "HeaderNavWrapper"
