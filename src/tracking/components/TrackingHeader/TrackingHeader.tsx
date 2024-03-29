import { useNavigate, useParams } from "react-router-dom"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { useAuthStore, useBoundStore } from "@/store"
import { IPerson, Role, RouteParams, ShipmentStatus, ShippingType } from "@/shared/types"
import { EDIT } from "@/constants"

import {
  ButtonIcon,
  Copy,
  Flex,
  GridContainer,
  Stack,
  StatusLabel,
  Title,
} from "@/shared/components"
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
  const role = user.authorities?.[0]?.authority

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
        <Flex
          justify={{ "@initial": "between", "@md": "start" }}
          direction={{ "@initial": "column", "@md": "row" }}
          css={{ gap: "$8", "@md": { gap: "$24" } }}
        >
          <Flex
            align="center"
            justify={{ "@initial": "between", "@md": "start" }}
            css={{ gap: "$24" }}
          >
            <StatusLabel status={shipmentStatus} />
            {(role === Role.Admin || role === Role.Ops) &&
            shipmentStatus !== ShipmentStatus.CANCELLED ? (
              <ButtonIcon
                type="button"
                ariaLabel="Edit shipment"
                icon={<IconPencil />}
                onClick={handleEditClick}
                inputIcon
              />
            ) : null}
          </Flex>
          <Title
            scale={{ "@initial": 3, "@md": 2 }}
            color="theme-b-n3"
            css={{ "@md": { order: -1 } }}
          >
            {shippingType === ShippingType.Shipment ? "Ship" : "Quote"} #{shipmentId}
          </Title>
        </Flex>
        {role === Role.Admin || role === Role.Ops ? (
          <Copy color="theme-n6-n5">
            {formatInTimeZone(Date.parse(createdAt), timeZone, "MMM d, yyyy hh:mm aa (zzz)")}
          </Copy>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
