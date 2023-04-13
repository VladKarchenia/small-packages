import { MapContainer } from "react-leaflet"

import { styled } from "@/stitches/config"

import { Flex } from "@/shared/components"

export const SMapContainer = styled(MapContainer, {
  minHeight: 260,
  height: "inherit",
  zIndex: "$2",

  "@md": {
    border: "1px solid $theme-vl-n11",
  },
})

export const SEmptyMapContainer = styled(Flex, {
  height: "100%",
  minHeight: 260,
  backgroundColor: "$theme-n2-n9",
  padding: "$20",
  zIndex: "$2",

  "@md": {
    border: "1px solid $theme-vl-n11",
  },
})
