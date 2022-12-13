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
import { IconCalendar } from "@/shared/icons"
import { useShipmentStateContext } from "@/shared/state"
import { ShipmentRoute, TrackingDetailsItem, SHIPMENT_DETAILS } from "@/tracking"
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

export const ShipmentDetailsUnauthorized = () => {
  const data = SHIPMENT_DETAILS
  const { rate, recipient, sender } = useShipmentStateContext()

  return (
    <STrackingGrid
      columns={{ "@initial": "1fr", "@md": "1fr 1fr 1fr 1fr" }}
      gap={{ "@initial": 16, "@md": 24 }}
      rows={"auto auto"}
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
                  fromAddress={sender.fullAddress.location}
                  toAddress={recipient.fullAddress.location}
                />
              </TrackingDetailsItem>
              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={16}>
                  <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Arrival date: {data.arrivalDate}
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
              <>
                <TrackingDetailsItem title="From where to where" titleScale={11}>
                  <AddressInfoShort
                    fromAddress={sender.fullAddress.location}
                    toAddress={recipient.fullAddress.location}
                  />
                </TrackingDetailsItem>
              </>

              <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                <Stack space={12}>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    Arrival date: {data.arrivalDate}
                  </Copy>
                  <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route" titleScale={11}>
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute routes={data.routes} />
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </GridContainer>
      </Hidden>

      <GridItem
        column={{ "@md": "span 3" }}
        css={{ gridArea: "map", margin: "0 -$16", "@sm": { margin: "0" } }}
      >
        <Map />
      </GridItem>

      <Hidden below="md">
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
    </STrackingGrid>
  )
}
