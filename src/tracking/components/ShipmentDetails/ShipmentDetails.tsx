import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { IGeolocation, IPackaging, IPerson, IRate, ShippingType } from "@/shared/types"
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
  currentLocation: IGeolocation
  packaging: IPackaging
  date: Date
  rate: IRate
  shipmentId: string
  shippingType: ShippingType
  theme?: string
}

export const ShipmentDetails = ({
  sender,
  recipient,
  currentLocation,
  packaging,
  date,
  rate,
  shipmentId,
  shippingType,
  theme,
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
          <TrackingDetailsItem title="Main Info" main>
            <Stack space={24}>
              <TrackingDetailsItem title="From where to where">
                <AddressInfoShort
                  fromAddress={sender.fullAddress}
                  toAddress={recipient.fullAddress}
                />
              </TrackingDetailsItem>
              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12} css={{ color: "$theme-b-n5" }}>
                  <ShortInfoLine icon={<IconTruck />} text={rate.name} />
                  <Flex css={{ gap: "$4" }}>
                    <Copy>Pickup date:</Copy>
                    <Copy>
                      {date
                        ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                            date,
                            timeZone,
                            "(zzz)",
                          )}`
                        : ""}
                    </Copy>
                  </Flex>
                  <Copy>
                    {/* TODO: change to the delivery date */}
                    {/* TODO: add real arrivalDate with the time zone */}
                    Delivery date: {SHIPMENT_DETAILS.arrivalDate}
                  </Copy>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details">
                <Stack space={8} css={{ color: "$theme-b-n5" }}>
                  <Copy>{`Pickup type: ${packaging.pickupType}`}</Copy>
                  <Copy>{`Package type: ${packaging.packagingType}`}</Copy>
                  <Copy>{`Contents: ${packaging.packageContent}`}</Copy>
                  <Flex align="center" justify="between">
                    <Flex align="center" justify="center" css={{ gap: "$8" }}>
                      <IconBox />
                      <Copy>
                        {`${packaging.totalPackagesNumber} ${
                          packaging.totalPackagesNumber === 1 ? "package" : "packages"
                        }`}
                      </Copy>
                    </Flex>
                    <Link
                      as="button"
                      type="button"
                      onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                      fontWeight="bold"
                      css={{ "& > span": { display: "flex", alignItems: "center" } }}
                    >
                      View all
                      <Spacer size={4} horizontal />
                      <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                    </Link>
                  </Flex>
                </Stack>
              </TrackingDetailsItem>
            </Stack>
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>

      <Hidden above="md">
        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "main" }}>
            <Stack space={24} dividers>
              <ShipmentURL
                url={SHIPMENT_DETAILS.shipmentURL}
                value={SHIPMENT_DETAILS.trackingNumber}
              />
              <TrackingDetailsItem title="From where to where">
                <AddressInfoShort
                  fromAddress={sender.fullAddress}
                  toAddress={recipient.fullAddress}
                />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12} css={{ color: "$theme-b-n5" }}>
                  <ShortInfoLine icon={<IconTruck />} text={rate.name} />
                  <Flex css={{ gap: "$4" }}>
                    <Copy>Pickup date:</Copy>
                    <Copy>
                      {date
                        ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                            date,
                            timeZone,
                            "(zzz)",
                          )}`
                        : ""}
                    </Copy>
                  </Flex>
                  {/* TODO: change to the delivery date */}
                  <Copy>Delivery date: {SHIPMENT_DETAILS.arrivalDate}</Copy>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details">
                <Stack space={8} css={{ color: "$theme-b-n5" }}>
                  <Copy>{`Pickup type: ${packaging.pickupType}`}</Copy>
                  <Copy>{`Package type: ${packaging.packagingType}`}</Copy>
                  <Copy>{`Contents: ${packaging.packageContent}`}</Copy>
                  <Flex align="center" justify="between">
                    <Flex align="center" justify="center" css={{ gap: "$8" }}>
                      <IconBox css={{ color: "$neutrals-7" }} />
                      <Copy>
                        {`${packaging.totalPackagesNumber} ${
                          packaging.totalPackagesNumber === 1 ? "package" : "packages"
                        }`}
                      </Copy>
                    </Flex>
                    <Link
                      as="button"
                      type="button"
                      onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                      fontWeight="bold"
                      css={{ "& > span": { display: "flex", alignItems: "center" } }}
                    >
                      View all
                      <Spacer size={4} horizontal />
                      <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                    </Link>
                  </Flex>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route">
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Sender’s info">
                <PersonInfoShort person="sender" sender={sender} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Recipient’s info">
                <PersonInfoShort person="recipient" recipient={recipient} />
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </GridContainer>
      </Hidden>

      <GridItem column={{ "@md": "span 3" }} css={{ gridArea: "map" }}>
        <Map
          sender={sender}
          recipient={recipient}
          currentLocation={currentLocation}
          theme={theme}
        />
      </GridItem>

      <Hidden below="md">
        <STrackingGridItem css={{ gridArea: "route" }}>
          <TrackingDetailsItem title="Route" main>
            {/* TODO: Fix Route block after BE data and final design */}
            <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>

      <Hidden below="md">
        <STrackingGridItem css={{ gridArea: "usersInfo" }}>
          <Stack space={32}>
            <TrackingDetailsItem title="Sender’s info" main>
              <PersonInfoShort person="sender" sender={sender} />
            </TrackingDetailsItem>
            <TrackingDetailsItem title="Recipient’s info" main>
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
          <TrackingDetailsItem title="Tracking & Label Links" main>
            <Hidden below="md">
              <ShipmentURL
                url={SHIPMENT_DETAILS.shipmentURL}
                value={SHIPMENT_DETAILS.trackingNumber}
              />
            </Hidden>
            <Hidden above="md">
              <Copy scale={10} color="neutrals-6">
                Shipment label must be printed and attached to a package before it is picked up
              </Copy>
            </Hidden>
          </TrackingDetailsItem>
          <Spacer size={24} />
          <ShipmentLabelContainer
            pdfLabel={SHIPMENT_DETAILS.shipmentLabelPDFLink}
            zplLabel={SHIPMENT_DETAILS.shipmentLabelZPLLink}
            pdfReturnLabel={SHIPMENT_DETAILS.shipmentReturnLabelPDFLink}
            zplReturnLabel={SHIPMENT_DETAILS.shipmentReturnLabelZPLLink}
          />
          <Spacer size={{ "@initial": 8, "@md": 0 }} />
          <Hidden below="md">
            <Spacer size={20} />
            <Copy scale={10} color="neutrals-6">
              * Shipment label must be printed and attached to a package before it is picked up
            </Copy>
          </Hidden>
        </STrackingGridItem>
      </GridContainer>
    </STrackingGrid>
  )
}
