import { IPerson, IRate } from "@/shared/types"

import {
  AddressInfoShort,
  Copy,
  GridItem,
  GridContainer,
  Hidden,
  Map,
  ShortInfoLine,
  Spacer,
  Stack,
  Title,
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
  rate: IRate
}

export const ShipmentDetailsUnauthorized = ({
  sender,
  recipient,
  rate,
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
          <Title as="h3" scale={7} color="system-black">
            Main Info
          </Title>

          <Spacer size={24} />

          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <Stack space={32}>
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
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                  </Copy>
                </Stack>
              </TrackingDetailsItem>
            </Stack>
          </GridContainer>
        </STrackingGridItem>
      </Hidden>

      <Hidden above="md">
        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "main" }}>
            <Stack space={24} dividers>
              <TrackingDetailsItem title="From where to where" titleScale={11}>
                <AddressInfoShort
                  fromAddress={sender.fullAddress}
                  toAddress={recipient.fullAddress}
                />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                <Stack space={12}>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                  </Copy>
                  <ShortInfoLine
                    icon={<IconTruck css={{ color: "$neutrals-7" }} />}
                    text={rate.name}
                  />
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route" titleScale={11}>
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
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
    </STrackingGrid>
  )
}
