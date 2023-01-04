import { useNavigate, useParams } from "react-router-dom"
import format from "date-fns/format"

import { ShippingType } from "@/shipment"
import { Role, ShipmentStatus } from "@/shared/types"
import { TrackingRouteParams } from "@/tracking/types"

import { ButtonIcon, Copy, Flex, GridContainer, Stack, StatusLabel } from "@/shared/components"
import { IconPencil } from "@/shared/icons"

interface ITrackingHeaderProps {
  shipmentDate: Date | null
  role?: Role
  shippingType: ShippingType | null
  status: ShipmentStatus | null
}

export const TrackingHeader = ({ shipmentDate, shippingType, status }: ITrackingHeaderProps) => {
  const { shipmentId } = useParams<keyof TrackingRouteParams>() as TrackingRouteParams
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
            <StatusLabel status={status} />
          </Flex>
          {role === Role.Admin && status !== ShipmentStatus.CANCELLED ? (
            <ButtonIcon
              type="button"
              ariaLabel="Edit shipment"
              icon={<IconPencil />}
              onClick={handleEditClick}
            />
          ) : null}
        </Flex>
        {role === Role.Admin ? (
          <Copy scale={{ "@initial": 10, "@md": 8 }}>
            {shipmentDate ? format(shipmentDate, "dd.MM.yyyy") : ""}
          </Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
