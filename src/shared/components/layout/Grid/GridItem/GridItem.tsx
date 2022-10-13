import React from "react"

import { ComponentProps, ResponsiveProp } from "@/utils/types"
import { mergeCSSObjects, getStyleFromResponsiveProp } from "@/utils/styles"

import { getGridCoords } from "../utils"

import { SGridItem } from "./GridItem.styles"

export type GridItemTrack = string | undefined

export type GridItemCoord = GridItemTrack | ResponsiveProp<GridItemTrack>

export interface IGridItemProps extends ComponentProps<typeof SGridItem> {
  column?: GridItemCoord
  row?: GridItemCoord
}

export const GridItem = React.forwardRef<HTMLDivElement, IGridItemProps>(
  ({ css = {}, column, row, ...props }, ref) => {
    const coords = getGridCoords(column, row)

    return (
      <SGridItem
        ref={ref}
        {...props}
        css={mergeCSSObjects(
          css,
          getStyleFromResponsiveProp(coords, ([column, row]) => ({
            gridColumn: column || "",
            gridRow: row || "",
          })),
        )}
      />
    )
  },
)

GridItem.displayName = "GridItem"
