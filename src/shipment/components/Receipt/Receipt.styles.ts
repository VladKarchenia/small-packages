import { styled } from "@/stitches/config"

import { GridItem } from "@/shared/components"

export const SGridItem = styled(GridItem, {
  "@sm": {
    padding: "$24",
    backgroundColor: "$theme-w-n9",
    border: "1px solid $theme-n4-tr",
  },
})
