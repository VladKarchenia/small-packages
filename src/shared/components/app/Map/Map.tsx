import { useRef } from "react"
import { Routing } from "leaflet"
import { MapContainer, TileLayer } from "react-leaflet"
import { Box } from "@/shared/components"
import { RoutingMachine } from "@/shipment"
import { useShipmentStateContext } from "@/shared/state"

export const Map = () => {
  const { recipient, sender } = useShipmentStateContext()
  const rMachine = useRef() as React.Ref<Routing.Control> | undefined

  if (
    !sender.fullAddress.latitude ||
    !sender.fullAddress.longitude ||
    !recipient.fullAddress.latitude ||
    !recipient.fullAddress.longitude
  ) {
    return <Box css={{ height: "100%" }}>No map</Box>
  }

  return (
    <Box css={{ height: "100%" }}>
      <MapContainer
        style={{ minHeight: "260px", height: "inherit", zIndex: "var(--zIndices-2)" }}
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
        <RoutingMachine
          ref={rMachine}
          // senderLat={sender.fullAddress.latitude}
          // senderLong={sender.fullAddress.longitude}
          // recipientLat={recipient.fullAddress.latitude}
          // recipientLong={recipient.fullAddress.longitude}
        />
      </MapContainer>
    </Box>
  )
}
