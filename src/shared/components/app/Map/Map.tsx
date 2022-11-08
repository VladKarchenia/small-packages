import { MapContainer, TileLayer } from "react-leaflet"
import { RoutingMachine } from "@/shipment"
import { Box } from "@/shared/components"

export const Map = () => {
  return (
    <Box>
      <MapContainer
        style={{ height: "260px" }}
        center={[57.74, 11.94]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine />
      </MapContainer>
    </Box>
  )
}
