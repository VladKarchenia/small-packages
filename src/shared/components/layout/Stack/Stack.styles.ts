import { css } from "@/stitches/config"
import { ResponsiveProp, Spaces } from "@/stitches/types"
import { getStyleFromResponsiveProp } from "@/stitches/utils"

export const applyStackStyles = (space: Spaces | ResponsiveProp<Spaces>) => ({
  width: "100%",

  before: {
    content: "''",
    display: "table",

    ...getStyleFromResponsiveProp(space, (value) => ({
      marginBottom: `-$${value}`,
    })),
  },
})

export const applyStackItemClassName = (space: Spaces | ResponsiveProp<Spaces>) =>
  css({
    "&:not(:empty)": getStyleFromResponsiveProp(space, (value) => ({
      paddingTop: `$${value}`,
    })),
  })()
