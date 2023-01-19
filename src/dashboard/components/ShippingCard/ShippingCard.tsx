import format from "date-fns/format"

import { IShipmentResponse } from "@/api/types"
import { ShipmentStatus } from "@/shared/types"
import { ShippingType } from "@/shipment"

import { Copy, Divider, Flex, Spacer, Stack, StatusLabel } from "@/shared/components"

import { ActionDetailsButton } from "../ActionDetailsButton"
import { SShippingCard } from "./ShippingCard.styles"

interface IShippingCardProps {
  shipment: IShipmentResponse
  shippingType: ShippingType
}

export const ShippingCard = ({ shipment, shippingType }: IShippingCardProps) => {
  return (
    <SShippingCard href={`/tracking/${shipment.id}`}>
      <Flex align="start" justify="between" css={{ width: "100%", paddingBottom: "$16" }}>
        <Stack space={8}>
          <StatusLabel status={ShipmentStatus[shipment.data.SHIPMENT_STATUS]} />
          <Copy scale={9} color="system-black" bold>
            #{shipment.id}
          </Copy>
          <Copy scale={9}>{format(new Date(shipment.createdAt), "MMM d, yyyy (OOO)")}</Copy>
        </Stack>
        <ActionDetailsButton shippingType={shippingType} shipmentId={shipment.id} horizontal />
      </Flex>
      <Divider />
      <ShippingCardInfo shippingType={shippingType} shipment={shipment} />
    </SShippingCard>
  )
}

const ShippingCardInfo = ({
  shipment,
  shippingType,
}: {
  shipment: IShipmentResponse
  shippingType: ShippingType
}) => {
  if (shippingType === ShippingType.Quote) {
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
    <Copy scale={9} css={{ paddingRight: "$32", minWidth: "max-content" }}>
      {title}
    </Copy>
    <Copy
      scale={9}
      color="system-black"
      css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
    >
      {value}
    </Copy>
  </Flex>
)
