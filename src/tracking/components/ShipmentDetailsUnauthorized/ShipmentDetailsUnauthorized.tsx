import { useShipmentStateContext } from "@/shared/state"

import {
  AddressInfoShort,
  Copy,
  GridItem,
  Hidden,
  Map,
  ShortInfoLine,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import { ShipmentRoute, TrackingDetailsItem, SHIPMENT_DETAILS } from "@/tracking"
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

export const ShipmentDetailsUnauthorized = () => {
  const { rate, recipient, sender } = useShipmentStateContext()

  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@sm": 24 }}
      rows={"auto auto"}
      css={{
        "@initial": {
          gridTemplateAreas: `"map"
                              "main"`,
        },
        "@sm": {
          gridTemplateAreas: `"main  map " 
                              "route map "`,
        },
      }}
    >
      <STrackingGridItem css={{ gridArea: "main" }}>
        <Hidden below="sm">
          <Title as="h3" scale={7} color="system-black">
            Main Info
          </Title>
        </Hidden>
        <Hidden below="sm">
          <Spacer size={24} />
        </Hidden>
        <Hidden below="sm">
          <Stack space={32}>
            <TrackingDetailsItem title="From where to where">
              <AddressInfoShort
                fromAddress={sender.fullAddress.displayName}
                toAddress={recipient.fullAddress.displayName}
              />
            </TrackingDetailsItem>
            <TrackingDetailsItem title="Date and delivery service">
              <Stack space={16}>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                </Copy>
              </Stack>
            </TrackingDetailsItem>
          </Stack>
        </Hidden>
        <Hidden above="sm">
          <Stack space={24} dividers>
            <>
              <TrackingDetailsItem title="From where to where" titleScale={11}>
                <AddressInfoShort
                  fromAddress={sender.fullAddress.displayName}
                  toAddress={recipient.fullAddress.displayName}
                />
              </TrackingDetailsItem>
            </>

            <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {SHIPMENT_DETAILS.arrivalDate}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
              </Stack>
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Route" titleScale={11}>
              {/* TODO: Fix Route block after BE data and final design */}
              <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
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
            <ShipmentRoute routes={SHIPMENT_DETAILS.routes} />
          </TrackingDetailsItem>
        </STrackingGridItem>
      </Hidden>
    </STrackingGrid>
  )
}
