import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { IShipmentResponse } from "@/api/types"
import { ShipmentStatus, ShippingType } from "@/shared/types"
import { TRACKING } from "@/constants"

import { Copy, Divider, Flex, Stack, StatusLabel } from "@/shared/components"
import { ActionDetailsButton } from "@/dashboard/components"

import { SShippingCard } from "./ShippingCard.styles"

interface IShippingCardProps {
  shipment: IShipmentResponse
  tab: ShippingType
  shippingType: ShippingType
}

export const ShippingCard = ({ shipment, tab, shippingType }: IShippingCardProps) => {
  const navigate = useNavigate()
  const timeZone = tzlookup(
    parseFloat(shipment.data.ORIGIN_GEOLOC.LATITUDE),
    parseFloat(shipment.data.ORIGIN_GEOLOC.LONGITUDE),
  )

  return (
    <SShippingCard onClick={() => navigate(`${TRACKING}/${shippingType}/${shipment.id}`)}>
      <Flex align="start" justify="between" css={{ width: "100%", paddingBottom: "$16" }}>
        <Stack space={8}>
          <StatusLabel status={ShipmentStatus[shipment.data.SHIPMENT_STATUS]} />
          <Copy scale={3} color="theme-b-n3" fontWeight="bold">
            #{shipment.id}
          </Copy>
          <Copy scale={10} color="theme-n6-n5">
            {formatInTimeZone(Date.parse(shipment.createdAt), timeZone, "MMM d, yyyy (zzz)")}
          </Copy>
        </Stack>
        <ActionDetailsButton tab={tab} shipmentId={shipment.id} horizontal />
      </Flex>
      <Divider />
      <ShippingCardInfo tab={tab} shipment={shipment} />
    </SShippingCard>
  )
}

const ShippingCardInfo = ({
  shipment,
  tab,
}: {
  shipment: IShipmentResponse
  tab: ShippingType
}) => {
  if (tab === ShippingType.Quote) {
    return (
      <Stack space={12} css={{ marginTop: "$16" }}>
        <ShippingCardInfoLine
          title="Origin address"
          value={shipment.data?.ORIGIN_GEOLOC?.DISPLAY_NAME || "-"}
        />
        <ShippingCardInfoLine
          title="Destination address"
          value={shipment.data?.CONSIGNEE_GEOLOC?.DISPLAY_NAME || "-"}
        />
      </Stack>
    )
  }

  return (
    <Stack space={12} css={{ marginTop: "$16" }}>
      <ShippingCardInfoLine title="Sender's name" value={shipment.data.ORIGIN_CONTACT} />
      <ShippingCardInfoLine title="Recipient's name" value={shipment.data.CONSIGNEE_CONTACT} />
      <ShippingCardInfoLine
        title="Destination address"
        value={shipment.data?.CONSIGNEE_GEOLOC?.DISPLAY_NAME || "-"}
      />
    </Stack>
  )
}

const ShippingCardInfoLine = ({ title, value }: { title: string; value: string }) => (
  <Flex align="center" justify="between">
    <Copy scale={10} color="theme-n6-n5" css={{ paddingRight: "$32", minWidth: "max-content" }}>
      {title}
    </Copy>
    <Copy scale={10} color="theme-b-n3" truncate>
      {value}
    </Copy>
  </Flex>
)
