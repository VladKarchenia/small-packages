import { useRef } from "react"
import { Routing } from "leaflet"
import { TileLayer } from "react-leaflet"

import { IPerson } from "@/shared/types"

import { Box, Copy } from "@/shared/components"
import { RoutingMachine } from "@/shipment/components"

import { SEmptyMapContainer, SMapContainer } from "./Map.styles"

interface IMapProps {
  sender: IPerson
  recipient: IPerson
}

export const Map = ({ sender, recipient }: IMapProps) => {
  const rMachine = useRef() as React.Ref<Routing.Control> | undefined

  if (
    !sender.fullAddress.latitude ||
    !sender.fullAddress.longitude ||
    !recipient.fullAddress.latitude ||
    !recipient.fullAddress.longitude
  ) {
    return (
      <SEmptyMapContainer align="center" justify="center">
        <Copy scale={7} color="system-black">
          No map
        </Copy>
      </SEmptyMapContainer>
    )
  }

  return (
    <Box css={{ height: "100%" }}>
      <SMapContainer
        center={[
          Math.abs(
            parseFloat(sender.fullAddress.latitude) - parseFloat(recipient.fullAddress.latitude),
          ),
          Math.abs(
            parseFloat(sender.fullAddress.longitude) - parseFloat(recipient.fullAddress.longitude),
          ),
        ]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine ref={rMachine} />
      </SMapContainer>
    </Box>
  )
}
