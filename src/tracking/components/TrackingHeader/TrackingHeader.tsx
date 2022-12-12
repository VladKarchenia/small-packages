import format from "date-fns/format"
import { ButtonIcon, Copy, Flex, GridContainer, Stack } from "@/shared/components"
import { StatusLabel } from "@/shared/components/app"
import { IconPencil } from "@/shared/icons"
import { useStateContext } from "@/shared/state"
import { Role, ShipmentStatus } from "@/shared/types"
import { ShippingType } from "@/shipment"

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
  shippingType,
  status,
}: ITrackingHeaderProps) => {
  const stateContext = useStateContext()
  const role = stateContext?.state.authUser?.role

  return (
    <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
      <Stack space={{ "@initial": 8, "@sm": 12 }}>
        <Flex align="center" justify={{ "@initial": "between", "@sm": "start" }}>
          <Flex align="center" css={{ marginRight: "$16" }}>
            <Copy
              scale={{ "@initial": 8, "@sm": 5 }}
              color="system-black"
              bold
              css={{ paddingRight: "$12" }}
            >
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
          <Copy scale={{ "@initial": 10, "@sm": 8 }}>
            {shipmentDate ? format(shipmentDate, "dd.MM.yyyy") : ""}
          </Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
