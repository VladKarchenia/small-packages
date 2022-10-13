import React from "react"

import { ComponentProps } from "@/utils/types"

import { SGridContainer } from "./GridContainer.styles"

export type IGridContainerProps = ComponentProps<typeof SGridContainer>

export const GridContainer = React.forwardRef<HTMLDivElement, IGridContainerProps>((props, ref) => {
  return <SGridContainer ref={ref} {...props} />
})

GridContainer.displayName = "GridContainer"
