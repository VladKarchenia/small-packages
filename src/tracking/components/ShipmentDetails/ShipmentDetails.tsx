import { format } from "date-fns"
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
  Hidden,
} from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import { useShipmentStateContext } from "@/shared/state"
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
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

export const ShipmentDetails = () => {
  const data = SHIPMENT_DETAILS
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()

  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@sm": 24 }}
      rows={"auto auto"}
    >
      <STrackingGridItem css={{ gridArea: "main" }}>
        <Hidden below="sm">
          <Title as="h3" scale={{ "@initial": 8, "@sm": 7 }}>
            Main Info
          </Title>
        </Hidden>
        <Hidden below="sm">
          <Stack space={24}>
            <TrackingDetailsItem title="From where to where">
              <AddressInfoShort
                fromAddress={sender.fullAddress.location}
                toAddress={recipient.fullAddress.location}
              />
            </TrackingDetailsItem>
            <TrackingDetailsItem title="Date and delivery service">
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

            <TrackingDetailsItem title="Shipment Details">
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
        </Hidden>
        <Hidden above="sm">
          <Stack space={24} dividers>
            <>
              <TrackingDetailsItem title="Tracking number" titleIndent={4} titleScale={11}>
                <ShipmentURL url={data.shipmentURL} value={data.trackingNumber} />
              </TrackingDetailsItem>
              <Spacer size={24} />
              <TrackingDetailsItem title="From where to where" titleScale={11}>
                <AddressInfoShort
                  fromAddress={sender.fullAddress.location}
                  toAddress={recipient.fullAddress.location}
                />
              </TrackingDetailsItem>
            </>

            <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
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
            <TrackingDetailsItem title="Shipment Details" titleScale={11}>
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

            <TrackingDetailsItem title="Route" titleScale={11}>
              {/* TODO: Fix Route block after BE data and final design */}
              <ShipmentRoute routes={data.routes} />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Sender’s info" titleScale={11}>
              <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Recipient’s info" titleScale={11}>
              <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
          </Stack>
        </Hidden>
      </STrackingGridItem>

      <GridItem
        column={{ "@sm": "span 3" }}
        css={{ gridArea: "map", margin: "0 -$16", "@sm": { margin: "0" } }}
      >
        <Map />
      </GridItem>

      <Hidden below="sm">
        <STrackingGridItem css={{ gridArea: "route" }}>
          <TrackingDetailsItem
            title="Route"
            titleScale={7}
            titleColor={"system-black"}
            titleIndent={24}
          >
            {/* TODO: Fix Route block after BE data and final design */}
            <ShipmentRoute routes={data.routes} />
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>

      <Hidden below="sm">
        <STrackingGridItem css={{ gridArea: "usersInfo" }}>
          <Stack space={12}>
            <TrackingDetailsItem
              title="Sender’s info"
              titleScale={7}
              titleColor={"system-black"}
              titleIndent={24}
            >
              <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
            <TrackingDetailsItem
              title="Recipient’s info"
              titleScale={7}
              titleColor={"system-black"}
              titleIndent={24}
            >
              <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
            </TrackingDetailsItem>
          </Stack>
        </STrackingGridItem>
      </Hidden>

      <STrackingGridItem css={{ gridArea: "costs" }}>
        <ShipmentCosts title="Costs" price={rate.price} costs={costs} />
      </STrackingGridItem>

      <STrackingGridItem css={{ gridArea: "labels" }}>
        <Hidden below="sm">
          <TrackingDetailsItem
            title="Tracking number"
            titleIndent={20}
            titleScale={7}
            titleColor={"system-black"}
          >
            <ShipmentURL url={data.shipmentURL} value={data.trackingNumber} />
          </TrackingDetailsItem>
          <Spacer size={32} />
        </Hidden>

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
