import { Copy, Flex, GridContainer } from "@/shared/components"
import { StatusLabel } from "@/shared/components/app"
import { SHIPMENT_STATUSES } from "@/shared/types"

export const TrackingHeader = ({shipmentID, shipmentDate}: {shipmentID: string, shipmentDate: string}) => {
  return(
    <GridContainer>
      <Flex css={{marginBottom: "$8"}} align="center">
        <Copy css={{marginRight:"$8"}} color="system-black" bold scale={8}>Ship #{shipmentID}</Copy>
        <StatusLabel status={SHIPMENT_STATUSES.CONFIRMED}/>
      </Flex>
      <Copy color="neutrals-7" scale={10}>{shipmentDate}</Copy>
    </GridContainer>
  )
}
