import { styled } from "@/config"
import { GridItem } from "@/shared/components"

export const SGridItem = styled(GridItem, {
  "@sm": {
    padding: "$24",
    border: "1px solid $neutrals-4",
    borderRadius: "$8",
  },
})
