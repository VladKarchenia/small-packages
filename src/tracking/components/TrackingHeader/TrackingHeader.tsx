import { ButtonIcon, Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { StatusLabel } from "@/shared/components/app"
import { IconPencil } from "@/shared/icons"
import { ShipmentStatus } from "@/shared/types"
import format from "date-fns/format"

interface ITrackingHeader {
  shipmentID: string
  shipmentDate: Date | null
}

export const TrackingHeader = ({ shipmentID, shipmentDate }: ITrackingHeader) => {
  return (
    <GridContainer>
      <Stack space={8}>
        <Flex align="center" justify="between">
          <Flex align="center">
            <Copy scale={8} color="system-black" bold css={{ paddingRight: "$12" }}>
              Ship #{shipmentID}
            </Copy>
            <StatusLabel status={ShipmentStatus.Confirmed} />
          </Flex>
          {/* TODO: navigate to Stepper by shipment ID */}
          <ButtonIcon
            ariaLabel="Edit shipment"
            icon={<IconPencil />}
            onClick={() => console.log("Clicked edit button")}
          />
        </Flex>
        <Copy scale={10}>{shipmentDate ? format(shipmentDate, "dd.MM.yyyy") : ""}</Copy>
      </Stack>
    </GridContainer>
  )
}
