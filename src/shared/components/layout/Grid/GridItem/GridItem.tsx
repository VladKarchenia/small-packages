import React from "react"

import { ComponentProps, ResponsiveProp } from "@/stitches/types"
import { mergeCSSObjects, getStyleFromResponsiveProp } from "@/stitches/utils"
import { getGridCoords } from "../utils"

import { SGridItem } from "./GridItem.styles"

type GridItemTrack = string | undefined

type GridItemCoord = GridItemTrack | ResponsiveProp<GridItemTrack>

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
