import { MapContainer, TileLayer } from "react-leaflet"
import { Box, GridContainer, Spacer, Title } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { RoutingMachine } from "@/shipment"

export const Tracking = () => {
  return (
    <CommonLayout>
      <GridContainer>
        <Spacer size={40} />
        <Title as="h2">Shimpent Tracking Details</Title>
        <Spacer size={32} />
        <Box css={{ width: "80vw" }}>
          <MapContainer
            style={{ height: "400px" }}
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
        <Spacer size={40} />
      </GridContainer>
    </CommonLayout>
  )
}
