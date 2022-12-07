import { Box, Copy, Divider, Flex, Spacer, Stack, StatusLabel } from "@/shared/components"
import { ShippingType } from "@/shipment"
import { ShipmentStatus } from "@/shared/types"
import { ActionDetailsButton } from "../ActionDetailsButton"
import { SShippingCard } from "./ShippingCard.styles"

interface IShipping {
  code: string
}

interface IShippingCardProps {
  booking: IShipping
  shippingType: ShippingType
}

export const ShippingCard = ({ booking, shippingType }: IShippingCardProps) => {
  const { code } = booking

  return (
    <SShippingCard href={"/tracking"}>
      <Flex align="start" justify="between" css={{ width: "100%", paddingBottom: "$16" }}>
        <Box>
          <Flex align="baseline">
            <Copy scale={9} color="system-black" bold>
              #{code}-5Z
            </Copy>
            {shippingType === ShippingType.Shipment ? (
              <>
                <Spacer size={16} horizontal />
                <StatusLabel status={ShipmentStatus.Confirmed} />
              </>
            ) : null}
          </Flex>
          <Spacer size={4} />
          <Copy scale={9}>18.10.2022</Copy>
          {/* <Copy scale={9}>{booking.date}</Copy> */}
        </Box>
        <ActionDetailsButton shippingType={shippingType} />
      </Flex>
      <Divider />
      <ShippingCardInfo shippingType={shippingType} />
    </SShippingCard>
  )
}

const ShippingCardInfo = ({ shippingType }: { shippingType: ShippingType }) => {
  if (shippingType === ShippingType.Quote) {
    return (
      <Stack space={12} css={{ marginTop: "$16" }}>
        <ShippingCardInfoLine
          title="Origin address"
          value="3376 San Diego Ave. Larnor, Dallaver, USA"
        />
        <ShippingCardInfoLine
          title="Destination address"
          value="4517 Washington Ave. Manor, Dallaver, USA"
        />
      </Stack>
    )
  }

  return (
    <Stack space={12} css={{ marginTop: "$16" }}>
      <ShippingCardInfoLine title="Sender's name" value="Pablo Diego José Francisco Picasso" />
      <ShippingCardInfoLine
        title="Recipient's name"
        value="Juan Nepomuceno María de los Remedios"
      />
      <ShippingCardInfoLine
        title="Destination address"
        value="4517 Washington Ave. Manor, Dallaver, USA"
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
