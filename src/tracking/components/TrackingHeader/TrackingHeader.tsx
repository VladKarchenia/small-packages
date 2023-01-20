import { useNavigate, useParams } from "react-router-dom"
import format from "date-fns/format"

import { ShippingType } from "@/shipment"
import { Role, RouteParams, ShipmentStatus } from "@/shared/types"

import { ButtonIcon, Copy, Flex, GridContainer, Stack, StatusLabel } from "@/shared/components"
import { IconPencil } from "@/shared/icons"
import { useShipmentStateContext } from "@/shared/state"

interface ITrackingHeaderProps {
  shipmentDate: Date | null
  role?: Role
}

export const TrackingHeader = ({ shipmentDate }: ITrackingHeaderProps) => {
  const { shippingType, shipmentStatus } = useShipmentStateContext()
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const navigate = useNavigate()
  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  const handleEditClick = () => {
    shippingType === ShippingType.Quote
      ? navigate(`/edit/quote/${shipmentId}`)
      : navigate(`/edit/shipment/${shipmentId}`)
  }

  return (
    <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
      <Stack space={{ "@initial": 8, "@md": 12 }}>
        <Flex align="center" justify={{ "@initial": "between", "@md": "start" }}>
          <Flex align="center" css={{ marginRight: "$16" }}>
            <Copy
              scale={{ "@initial": 8, "@md": 5 }}
              color="system-black"
              bold
              css={{ paddingRight: "$12" }}
            >
              {shippingType === ShippingType.Shipment ? "Ship" : "Quote"} #{shipmentId}
            </Copy>
            <StatusLabel status={shipmentStatus} />
          </Flex>
          {(role === Role.Admin || role === Role.Ops) &&
          shipmentStatus !== ShipmentStatus.CANCELLED ? (
            <ButtonIcon
              type="button"
              ariaLabel="Edit shipment"
              icon={<IconPencil />}
              onClick={handleEditClick}
            />
          ) : null}
        </Flex>
        {role === Role.Admin || role === Role.Ops ? (
          <Copy scale={{ "@initial": 10, "@md": 8 }}>
            {/* TODO: this is create date, with time and time zone */}
            {shipmentDate ? format(shipmentDate, "dd.MM.yyyy (OOO)") : ""}
          </Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
