import React from "react"
import {
  ComponentProps,
  ResponsiveProp,
  mergeCSSObjects,
  getStyleFromResponsiveProp,
} from "@/utils"
import { getGridCoords } from "../utils"

import { SGrid } from "./Grid.styles"

type GridTrack = number | string | undefined

type GridCoord = GridTrack | ResponsiveProp<GridTrack>

/**
 * If needed we can expose an API to easily create "grid areas"
 */
export interface IGridProps extends ComponentProps<typeof SGrid> {
  columns?: GridCoord
  rows?: GridCoord
}

export const Grid = React.forwardRef<HTMLDivElement, IGridProps>(
  ({ css = {}, columns, rows, ...props }, ref) => {
    const coords = getGridCoords(columns, rows)

    return (
      <SGrid
        ref={ref}
        {...props}
        css={mergeCSSObjects(
          css,
          getStyleFromResponsiveProp(coords, ([columns, rows]) => ({
            gridTemplateColumns: typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns,
            gridTemplateRows: typeof rows === "number" ? `repeat(${rows}, 1fr)` : rows,
          })),
        )}
      />
    )
  },
)

Grid.displayName = "Grid"
