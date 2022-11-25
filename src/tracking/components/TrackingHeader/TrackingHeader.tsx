import { ButtonIcon, Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { StatusLabel } from "@/shared/components/app"
import { IconPencil } from "@/shared/icons"
import { Role, ShipmentStatus } from "@/shared/types"
import { ShippingType } from "@/shipment"
import format from "date-fns/format"

interface ITrackingHeaderProps {
  shipmentID: string
  shipmentDate: Date | null
  role?: Role
  shippingType: ShippingType
  status: ShipmentStatus
}

export const TrackingHeader = ({
  shipmentID,
  shipmentDate,
  role,
  shippingType,
  status,
}: ITrackingHeaderProps) => {
  return (
    <GridContainer>
      <Stack space={8}>
        <Flex align="center" justify="between">
          <Flex align="center">
            <Copy scale={8} color="system-black" bold css={{ paddingRight: "$12" }}>
              {shippingType === ShippingType.Shipment ? "Ship" : "Quote"} #{shipmentID}
            </Copy>
            <StatusLabel status={status} />
          </Flex>
          {/* TODO: navigate to Stepper by shipment ID */}
          {role === Role.Admin && status !== ShipmentStatus.Eliminated ? (
            <ButtonIcon
              ariaLabel="Edit shipment"
              icon={<IconPencil />}
              onClick={() => console.log("Clicked edit button")}
            />
          ) : null}
        </Flex>
        {role === Role.Admin ? (
          <Copy scale={10}>{shipmentDate ? format(shipmentDate, "dd.MM.yyyy") : ""}</Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
