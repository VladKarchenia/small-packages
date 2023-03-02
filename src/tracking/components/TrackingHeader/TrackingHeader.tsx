import { useNavigate, useParams } from "react-router-dom"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { useAuthStore, useBoundStore } from "@/store"
import { IPerson, Role, RouteParams, ShipmentStatus, ShippingType } from "@/shared/types"
import { EDIT } from "@/constants"

import { ButtonIcon, Copy, Flex, GridContainer, Stack, StatusLabel } from "@/shared/components"
import { IconPencil } from "@/shared/icons"

interface ITrackingHeaderProps {
  sender: IPerson
  createdAt: string
  shipmentStatus: ShipmentStatus | null
  role?: Role
}

export const TrackingHeader = ({ sender, createdAt, shipmentStatus }: ITrackingHeaderProps) => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const navigate = useNavigate()
  const shippingType = useBoundStore((state) => state.shippingType)
  const user = useAuthStore((state) => state.user)
  const role = user?.authorities?.[0]?.authority

  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )

  const handleEditClick = () => {
    shippingType === ShippingType.Quote
      ? navigate(`${EDIT}/quote/${shipmentId}`)
      : navigate(`${EDIT}/shipment/${shipmentId}`)
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
            {formatInTimeZone(Date.parse(createdAt), timeZone, "MMM d, yyyy hh:mm aa (zzz)")}
          </Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
