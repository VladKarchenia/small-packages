import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { IPackaging, IPerson, IRate, ShippingType } from "@/shared/types"
import { TRACKING } from "@/constants"

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
  GridContainer,
  Link,
} from "@/shared/components"
import { IconBox, IconChevronRight, IconTruck } from "@/shared/icons"
import {
  SHIPMENT_DETAILS,
  costs,
  TrackingDetailsItem,
  ShipmentURL,
  ShipmentRoute,
  ShipmentCosts,
  ShipmentLabelContainer,
} from "@/tracking/components"

import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

interface IShipmentDetailsProps {
  sender: IPerson
  recipient: IPerson
  packaging: IPackaging
  date: Date
  rate: IRate
  shipmentId: string
  shippingType: ShippingType
}

export const ShipmentDetails = ({
  sender,
  recipient,
  packaging,
  date,
  rate,
  shipmentId,
  shippingType,
}: IShipmentDetailsProps) => {
  const navigate = useNavigate()
  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )

  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@md": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@md": 24 }}
      rows="auto auto"
    >
      <Hidden below="md" css={{ gridArea: "main" }}>
        <STrackingGridItem>
          <Stack space={24}>
            <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
              Main Info
            </Title>
            <TrackingDetailsItem title="From where to where">
              <AddressInfoShort
                fromAddress={sender.fullAddress}
                toAddress={recipient.fullAddress}
              />
            </TrackingDetailsItem>
            <TrackingDetailsItem title="Date and delivery service">
              <Stack space={12}>
                <ShortInfoLine
                  icon={<IconTruck css={{ color: "$neutrals-7" }} />}
                  text={rate.name}
                />
                <Flex css={{ gap: "$4" }}>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Pickup date:
                  </Copy>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {date
                      ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                          date,
                          timeZone,
                          "(zzz)",
                        )}`
                      : ""}
                  </Copy>
                </Flex>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  {/* TODO: add real arrivalDate with the time zone */}
                  Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                </Copy>
              </Stack>
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Shipment Details">
              <Stack space={8}>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  {`Pickup type: ${packaging.pickupType}`}
                </Copy>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  {`Package type: ${packaging.packagingType}`}
                </Copy>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  {`Contents: ${packaging.packageContent}`}
                </Copy>
                <Flex align="center" justify="between">
                  <Flex align="center" justify="center" css={{ gap: "$8" }}>
                    <IconBox css={{ color: "$neutrals-7" }} />
                    <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                      {`${packaging.totalPackagesNumber} ${
                        packaging.totalPackagesNumber === 1 ? "parcel" : "parcels"
                      }`}
                    </Copy>
                  </Flex>
                  <Link
                    onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                  >
                    <Copy
                      as="span"
                      scale={{ "@initial": 9, "@md": 8 }}
                      color="system-black"
                      bold
                      css={{ display: "flex", alignItems: "center" }}
                    >
                      View all
                      <Spacer size={4} horizontal />
                      <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                    </Copy>
                  </Link>
                </Flex>
              </Stack>
            </TrackingDetailsItem>
          </Stack>
        </STrackingGridItem>
      </Hidden>

      <Hidden above="md">
        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "main" }}>
            <Stack space={24} dividers>
              <>
                <TrackingDetailsItem title="Tracking number link" titleIndent={4} titleScale={11}>
                  <ShipmentURL
                    url={SHIPMENT_DETAILS.shipmentURL}
                    value={SHIPMENT_DETAILS.trackingNumber}
                  />
                </TrackingDetailsItem>
                <Spacer size={24} />
                <TrackingDetailsItem title="From where to where" titleScale={11}>
                  <AddressInfoShort
                    fromAddress={sender.fullAddress}
                    toAddress={recipient.fullAddress}
                  />
                </TrackingDetailsItem>
              </>

              <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                <Stack space={12}>
                  <ShortInfoLine
                    icon={<IconTruck css={{ color: "$neutrals-7" }} />}
                    text={rate.name}
                  />
                  <Flex css={{ gap: "$4" }}>
                    <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                      Pickup date:
                    </Copy>
                    <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                      {date
                        ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                            date,
                            timeZone,
                            "(zzz)",
                          )}`
                        : ""}
                    </Copy>
                  </Flex>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                  </Copy>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details" titleScale={11}>
                <Stack space={8}>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {`Pickup type: ${packaging.pickupType}`}
                  </Copy>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {`Package type: ${packaging.packagingType}`}
                  </Copy>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {`Contents: ${packaging.packageContent}`}
                  </Copy>
                  <Flex align="center" justify="between">
                    <Flex align="center" justify="center" css={{ gap: "$8" }}>
                      <IconBox css={{ color: "$neutrals-7" }} />
                      <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                        {`${packaging.totalPackagesNumber} ${
                          packaging.totalPackagesNumber === 1 ? "parcel" : "parcels"
                        }`}
                      </Copy>
                    </Flex>
                    <Link
                      onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                    >
                      <Copy
                        as="span"
                        scale={{ "@initial": 9, "@md": 8 }}
                        color="system-black"
                        bold
                        css={{ display: "flex", alignItems: "center" }}
                      >
                        View all
                        <Spacer size={4} horizontal />
                        <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                      </Copy>
                    </Link>
                  </Flex>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route" titleScale={11}>
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Sender’s info" titleScale={11}>
                <PersonInfoShort person="sender" sender={sender} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Recipient’s info" titleScale={11}>
                <PersonInfoShort person="recipient" recipient={recipient} />
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </GridContainer>
      </Hidden>

      <GridItem column={{ "@md": "span 3" }} css={{ gridArea: "map" }}>
        <Map sender={sender} recipient={recipient} />
      </GridItem>

      <Hidden below="md">
        <STrackingGridItem css={{ gridArea: "route" }}>
          <TrackingDetailsItem
            title="Route"
            titleScale={7}
            titleColor="system-black"
            titleIndent={24}
          >
            {/* TODO: Fix Route block after BE data and final design */}
            <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>

      <Hidden below="md">
        <STrackingGridItem css={{ gridArea: "usersInfo" }}>
          <Stack space={12}>
            <TrackingDetailsItem
              title="Sender’s info"
              titleScale={7}
              titleColor="system-black"
              titleIndent={24}
            >
              <PersonInfoShort person="sender" sender={sender} />
            </TrackingDetailsItem>
            <TrackingDetailsItem
              title="Recipient’s info"
              titleScale={7}
              titleColor="system-black"
              titleIndent={24}
            >
              <PersonInfoShort person="recipient" recipient={recipient} />
            </TrackingDetailsItem>
          </Stack>
        </STrackingGridItem>
      </Hidden>

      <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
        <STrackingGridItem css={{ gridArea: "costs" }}>
          <ShipmentCosts title="Costs" price={rate.price} costs={costs} />
        </STrackingGridItem>
      </GridContainer>

      <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
        <STrackingGridItem css={{ gridArea: "labels" }}>
          <Hidden below="md">
            <TrackingDetailsItem
              title="Tracking & Label Links"
              titleIndent={16}
              titleScale={7}
              titleColor="system-black"
            >
              <ShipmentURL
                url={SHIPMENT_DETAILS.shipmentURL}
                value={SHIPMENT_DETAILS.trackingNumber}
              />
            </TrackingDetailsItem>
          </Hidden>

          <Hidden above="md">
            <Title as="h3" scale={7}>
              Label links
            </Title>
            <Spacer size={16} />
            <Copy scale={9}>
              Shipment label must be printed and attached to a package before it is picked up
            </Copy>
          </Hidden>
          <Spacer size={{ "@initial": 24, "@md": 32 }} />
          <ShipmentLabelContainer
            pdfLabel={SHIPMENT_DETAILS.shipmentLabelPDFLink}
            zplLabel={SHIPMENT_DETAILS.shipmentLabelZPLLink}
            pdfReturnLabel={SHIPMENT_DETAILS.shipmentReturnLabelPDFLink}
            zplReturnLabel={SHIPMENT_DETAILS.shipmentReturnLabelZPLLink}
          />
          <Spacer size={{ "@initial": 8, "@md": 0 }} />
          <Hidden below="md">
            <Spacer size={20} />
            <Copy scale={9}>
              * Shipment label must be printed and attached to a package before it is picked up
            </Copy>
          </Hidden>
        </STrackingGridItem>
      </GridContainer>
    </STrackingGrid>
  )
}
