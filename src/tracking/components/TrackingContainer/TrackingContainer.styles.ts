import { styled } from "@/config"
import { Grid, GridItem } from "@/shared/components"

export const STrackingSection = styled("div", {
  border: "1px solid $neutrals-4",
  borderRadius: "$8",
  padding: "$16",
})

export const STrackingGridItem = styled(GridItem, {
  height: "100%",
  border: "1px solid $neutrals-4",
  borderRadius: "$8",
  padding: "$16",

  "@sm": {
    padding: "$24",
  },
})

export const STrackingGrid = styled(Grid, {
  gridTemplateAreas: `"map"
                      "main"
                      "costs"
                      "labels"`,
  alignItems: "stretch",
  alignContent: "stretch",

  "@sm": {
    gridTemplateAreas: `"main  map       map   map   " 
                        "route usersInfo costs labels"`,
    alignItems: "stretch",
    alignContent: "stretch",
  },
})
