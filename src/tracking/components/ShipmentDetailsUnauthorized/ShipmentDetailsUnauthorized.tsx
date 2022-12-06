import { useShipmentStateContext } from "@/shared/state"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import {
  AddressInfoShort,
  Copy,
  GridItem,
  Map,
  ShortInfoLine,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import { ShipmentRoute, TrackingDetailsItem, SHIPMENT_DETAILS } from "@/tracking"
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"
import { IconCalendar } from "@/shared/icons"

export const ShipmentDetailsUnauthorized = () => {
  const data = SHIPMENT_DETAILS
  const { rate, recipient, sender } = useShipmentStateContext()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

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
        {isSmallAndAbove ? (
          <Title as="h3" scale={7} color="system-black">
            Main Info
          </Title>
        ) : null}
        {isSmallAndAbove ? <Spacer size={24} /> : null}
        {isSmallAndAbove ? (
          <Stack space={32}>
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
              <Stack space={16}>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {data.arrivalDate}
                </Copy>
              </Stack>
            </TrackingDetailsItem>
          </Stack>
        ) : (
          <Stack space={24} dividers>
            <>
              <TrackingDetailsItem title="From where to where" titleSize={11}>
                <AddressInfoShort
                  fromAddress={sender.fullAddress.location}
                  toAddress={recipient.fullAddress.location}
                />
              </TrackingDetailsItem>
            </>

            <TrackingDetailsItem title="Date and delivery service" titleSize={11} titleIndent={16}>
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
                  Arrival date: {data.arrivalDate}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
              </Stack>
            </TrackingDetailsItem>

            <TrackingDetailsItem
              title="Route"
              titleSize={11}
              titleColor={"neutrals-7"}
              titleIndent={16}
            >
              {/* TODO: Fix Route block after BE data and final design */}
              <ShipmentRoute routes={data.routes} />
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
    </STrackingGrid>
  )
}
