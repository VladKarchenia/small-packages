import { useShipmentStateContext } from "@/shared/state"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import {
  SHIPMENT_DETAILS,
  costs,
  TrackingDetailsItem,
  ShipmentURL,
  ShipmentRoute,
  ShipmentCosts,
  ShipmentLabelContainer,
} from "@/tracking"
import {
  AddressInfoShort,
  Copy,
  Flex,
  GridItem,
  Map,
  PersonInfoShort,
  ShortInfoLine,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"
import { format } from "date-fns"
import { IconCalendar } from "@/shared/icons"

export const ShipmentDetails = () => {
  const data = SHIPMENT_DETAILS
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@sm": 24 }}
      rows={"auto auto"}
    >
      <STrackingGridItem css={{ gridArea: "main" }}>
        {isSmallAndAbove ? (
          <Title as="h3" scale={{ "@initial": 8, "@sm": 7 }}>
            Main Info
          </Title>
        ) : null}
        {isSmallAndAbove ? (
          <Stack space={24}>
            <TrackingDetailsItem
              title="From where to where"
              titleColor={"neutrals-7"}
              titleSize={9}
              titleIndent={16}
            >
              <AddressInfoShort
                fromAddress={sender.fullAddress.location}
                toAddress={recipient.fullAddress.location}
              />
            </TrackingDetailsItem>
            <TrackingDetailsItem
              title="Date and delivery service"
              titleColor={"neutrals-7"}
              titleSize={9}
            >
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Pickup date: {date ? format(date, "dd.MM.yyyy hh:mm aa") : ""}
                </Copy>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {data.arrivalDate}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
              </Stack>
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Shipment Details" titleColor={"neutrals-7"} titleSize={9}>
              <Stack space={12}>
                {parcels.map((parcel, index) => (
                  <Stack space={8} key={index}>
                    {parcels.length > 1 ? (
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black" bold>
                        Parcel {index + 1}
                      </Copy>
                    ) : null}
                    <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                      {parcel.content}, ${parcel.totalPrice}, {parcel.packageType},{" "}
                      {parcel.pickupType}
                    </Copy>
                    <Flex align="center">
                      <Flex align="center" justify="center">
                        <IconCalendar size="xs" />
                      </Flex>
                      <Spacer size={8} horizontal />
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                        {parcel.dimensions.length}x{parcel.dimensions.width}x
                        {parcel.dimensions.height} in;
                      </Copy>
                      <Spacer size={8} horizontal />
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                        {parcel.weight} lb
                      </Copy>
                    </Flex>
                  </Stack>
                ))}
              </Stack>
            </TrackingDetailsItem>
          </Stack>
        ) : (
          <Stack space={24} dividers>
            <>
              <TrackingDetailsItem
                title="Tracking number"
                titleIndent={4}
                titleColor={"neutrals-7"}
                titleSize={11}
              >
                <ShipmentURL url={data.shipmentURL} value={data.trackingNumber} />
              </TrackingDetailsItem>
              <Spacer size={24} />
              <TrackingDetailsItem
                title="From where to where"
                titleColor={"neutrals-7"}
                titleSize={11}
              >
                <AddressInfoShort
                  fromAddress={sender.fullAddress.location}
                  toAddress={recipient.fullAddress.location}
                />
              </TrackingDetailsItem>
            </>

            <TrackingDetailsItem
              title="Date and delivery service"
              titleColor={"neutrals-7"}
              titleSize={11}
            >
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Pickup date: {date ? format(date, "dd.MM.yyyy hh:mm aa") : ""}
                </Copy>

                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {data.arrivalDate}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
              </Stack>
            </TrackingDetailsItem>
            <TrackingDetailsItem title="Shipment Details" titleColor={"neutrals-7"} titleSize={11}>
              <Stack space={12}>
                {parcels.map((parcel, index) => (
                  <Stack space={8} key={index}>
                    {parcels.length > 1 ? (
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black" bold>
                        Parcel {index + 1}
                      </Copy>
                    ) : null}
                    <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                      {parcel.content}, ${parcel.totalPrice}, {parcel.packageType},{" "}
                      {parcel.pickupType}
                    </Copy>
                    <Flex align="center">
                      <Flex align="center" justify="center">
                        <IconCalendar size="xs" />
                      </Flex>
                      <Spacer size={8} horizontal />
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                        {parcel.dimensions.length}x{parcel.dimensions.width}x
                        {parcel.dimensions.height} in;
                      </Copy>
                      <Spacer size={8} horizontal />
                      <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                        {parcel.weight} lb
                      </Copy>
                    </Flex>
                  </Stack>
                ))}
              </Stack>
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Route" titleColor={"neutrals-7"} titleSize={11}>
              {/* TODO: Fix Route block after BE data and final design */}
              <ShipmentRoute routes={data.routes} />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Sender’s info" titleColor={"neutrals-7"} titleSize={11}>
              <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Recipient’s info" titleColor={"neutrals-7"} titleSize={11}>
              <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
          </Stack>
        )}
      </STrackingGridItem>

      <GridItem
        column={{ "@sm": "span 3" }}
        css={{ gridArea: "map", margin: "0 -$16", "@sm": { margin: "0" } }}
      >
        <Map />
      </GridItem>

      {isSmallAndAbove ? (
        <STrackingGridItem css={{ gridArea: "route" }}>
          <TrackingDetailsItem
            title="Route"
            titleSize={7}
            titleColor={"system-black"}
            titleIndent={24}
          >
            {/* TODO: Fix Route block after BE data and final design */}
            <ShipmentRoute routes={data.routes} />
          </TrackingDetailsItem>
        </STrackingGridItem>
      ) : null}

      {isSmallAndAbove ? (
        <STrackingGridItem css={{ gridArea: "usersInfo" }}>
          <Stack space={12}>
            <TrackingDetailsItem
              title="Sender’s info"
              titleSize={7}
              titleColor={"system-black"}
              titleIndent={24}
            >
              <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
            <TrackingDetailsItem
              title="Recipient’s info"
              titleSize={7}
              titleColor={"system-black"}
              titleIndent={24}
            >
              <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
          </Stack>
        </STrackingGridItem>
      ) : null}

      <STrackingGridItem css={{ gridArea: "costs" }}>
        <ShipmentCosts title="Costs" price={rate.price} costs={costs} />
      </STrackingGridItem>

      <STrackingGridItem css={{ gridArea: "labels" }}>
        {isSmallAndAbove ? (
          <TrackingDetailsItem
            title="Tracking number"
            titleIndent={20}
            titleSize={7}
            titleColor={"system-black"}
          >
            <ShipmentURL url={data.shipmentURL} value={data.trackingNumber} />
          </TrackingDetailsItem>
        ) : null}

        <Title as="h3" scale={{ "@initial": 8, "@sm": 7 }}>
          Shipment label
        </Title>
        <Spacer size={{ "@initial": 16, "@sm": 24 }} />
        <Copy scale={{ "@initial": 9, "@sm": 8 }}>
          Shipment label must be printed and attached to a package before it is picked up
        </Copy>
        <Spacer size={{ "@initial": 24, "@sm": 32 }} />
        <ShipmentLabelContainer
          pdfLabel={data.shipmentLabelPDFLink}
          zplLabel={data.shipmentLabelZPLLink}
        />
      </STrackingGridItem>
    </STrackingGrid>
  )
}
