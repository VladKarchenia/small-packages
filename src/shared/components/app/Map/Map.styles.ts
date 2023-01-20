import { MapContainer } from "react-leaflet"
import { styled } from "@/config"
import { Flex } from "@/shared/components"

export const SMapContainer = styled(MapContainer, {
  minHeight: "260px",
  height: "inherit",
  zIndex: "$2",

  "@md": {
    borderRadius: "$8",
  },
})

export const SEmptyMapContainer = styled(Flex, {
  height: "100%",
  minHeight: "260px",
  backgroundColor: "$neutrals-3",
  padding: "$20",
  zIndex: "$2",

  "@md": {
    borderRadius: "$8",
  },
})
