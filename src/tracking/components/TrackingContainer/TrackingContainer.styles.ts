import { styled } from "@/stitches/config"

import { Grid, GridItem } from "@/shared/components"

export const STrackingSection = styled("div", {
  border: "1px solid $theme-n3-n7",
  padding: "$16",

  "@md": {
    padding: "$24",
  },
})

export const STrackingGridItem = styled(GridItem, {
  height: "100%",
  border: "1px solid $theme-n3-n7",
  padding: "$16",

  "@md": {
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

  "@md": {
    gridTemplateAreas: `"main  map       map   map   " 
                        "route usersInfo costs labels"`,
    alignItems: "stretch",
    alignContent: "stretch",
  },
})
