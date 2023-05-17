import { IGeolocation, IPerson, IRate } from "@/shared/types"

import {
  AddressInfoShort,
  Copy,
  GridItem,
  GridContainer,
  Hidden,
  Map,
  ShortInfoLine,
  Stack,
} from "@/shared/components"
import { IconTruck } from "@/shared/icons"
import { ShipmentRoute, TrackingDetailsItem, SHIPMENT_DETAILS } from "@/tracking/components"

import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

interface IShipmentDetailsUnauthorizedProps {
  sender: IPerson
  recipient: IPerson
  currentLocation: IGeolocation
  rate: IRate
  theme?: string
}

export const ShipmentDetailsUnauthorized = ({
  sender,
  recipient,
  currentLocation,
  rate,
  theme,
}: IShipmentDetailsUnauthorizedProps) => {
  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@md": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@md": 24 }}
      rows="auto auto"
      css={{
        "@initial": {
          gridTemplateAreas: `"map"
                              "main"`,
        },
        "@md": {
          gridTemplateAreas: `"main  map " 
                              "route map "`,
        },
      }}
    >
      <Hidden below="md" css={{ gridArea: "main" }}>
        <STrackingGridItem>
          <TrackingDetailsItem title="Main Info" main>
            <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
              <Stack space={32}>
                <TrackingDetailsItem title="From where to where">
                  <AddressInfoShort
                    fromAddress={sender.fullAddress}
                    toAddress={recipient.fullAddress}
                  />
                </TrackingDetailsItem>
                <TrackingDetailsItem title="Date and delivery service">
                  <Stack space={12} css={{ color: "$theme-b-n5" }}>
                    <ShortInfoLine icon={<IconTruck />} text={rate.name} />
                    {/* TODO: change to the delivery date */}
                    <Copy>Delivery date: {SHIPMENT_DETAILS.arrivalDate}</Copy>
                  </Stack>
                </TrackingDetailsItem>
              </Stack>
            </GridContainer>
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>

      <Hidden above="md">
        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "main" }}>
            <Stack space={24} dividers>
              <TrackingDetailsItem title="From where to where">
                <AddressInfoShort
                  fromAddress={sender.fullAddress}
                  toAddress={recipient.fullAddress}
                />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12} css={{ color: "$theme-b-n5" }}>
                  {/* TODO: change to the delivery date */}
                  <Copy>Delivery date: {SHIPMENT_DETAILS.arrivalDate}</Copy>
                  <ShortInfoLine icon={<IconTruck />} text={rate.name} />
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route">
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
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
    </STrackingGrid>
  )
}
