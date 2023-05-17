import React from "react"

import { ComponentProps } from "@/stitches/types"

import { SFlex } from "./Flex.styles"

export interface IFlexProps extends ComponentProps<typeof SFlex> {}

export const Flex = React.forwardRef<HTMLDivElement, IFlexProps>((props, ref) => (
  <SFlex ref={ref} {...props} />
))

Flex.displayName = "Flex"
