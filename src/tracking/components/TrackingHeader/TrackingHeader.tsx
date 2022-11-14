import { Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { StatusLabel } from "@/shared/components/app"
import { ShipmentStatus } from "@/shared/types"

interface ITrackingHeader {
  shipmentID: string
  shipmentDate: string
}

export const TrackingHeader = ({ shipmentID, shipmentDate }: ITrackingHeader) => {
  return (
    <GridContainer>
      <Stack space={8}>
        <Flex align="center">
          <Copy scale={8} color="system-black" bold css={{ paddingRight: "$12" }}>
            Ship #{shipmentID}
          </Copy>
          <StatusLabel status={ShipmentStatus.Confirmed} />
        </Flex>
        <Copy scale={10}>{shipmentDate}</Copy>
      </Stack>
    </GridContainer>
  )
}
