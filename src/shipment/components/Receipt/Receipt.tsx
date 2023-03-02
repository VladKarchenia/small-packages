import { useFormContext } from "react-hook-form"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { ShipmentState } from "@/shared/types"

import {
  Copy,
  Flex,
  Grid,
  GridContainer,
  PersonInfoShort,
  ShortInfoLine,
  Spacer,
  Stack,
} from "@/shared/components"
import { IconClock, IconTruck } from "@/shared/icons"

import { SGridItem } from "./Receipt.styles"

export const Receipt = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient, rate, date, packaging, parcels } = watch()

  const senderTimeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )
  const recipientTimeZone = tzlookup(
    parseFloat(recipient.fullAddress.latitude),
    parseFloat(recipient.fullAddress.longitude),
  )

  return (
    <GridContainer fullBleed>
      <Grid columns={{ "@initial": "1fr", "@md": "1fr 1fr" }} gap={{ "@initial": 24, "@sm": 16 }}>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship From
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person="sender" sender={sender} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship To
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person="recipient" recipient={recipient} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Shipment details
          </Copy>
          <Spacer size={16} />
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
            <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
              {`Number of packages: ${packaging.totalPackagesNumber}`}
            </Copy>
            <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
              {`Total weight: ${Object.values(parcels)
                .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                .toFixed(1)} lb`}
            </Copy>
            <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
              {`Total Declared Value: $${Object.values(parcels)
                .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                .toFixed(0)}`}
            </Copy>
          </Stack>
        </SGridItem>
        <SGridItem>
          <Stack space={24}>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Ready date
              </Copy>
              <Spacer size={16} />
              <ShortInfoLine
                icon={<IconClock css={{ color: "$neutrals-7" }} />}
                text={formatInTimeZone(date, senderTimeZone, "MMM d, yyyy hh:mm aa (zzz)")}
              />
            </>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Delivery rates
              </Copy>
              <Spacer size={16} />
              <Stack space={12}>
                <ShortInfoLine
                  icon={<IconTruck css={{ color: "$neutrals-7" }} />}
                  text={rate.name}
                />
                <Flex wrap css={{ gap: "$4" }}>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {/* TODO: fix this date&time to arrival, not pickup */}
                    Arrival date:
                  </Copy>
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {formatInTimeZone(date, recipientTimeZone, "MMM d, yyyy hh:mm aa (zzz)")}
                  </Copy>
                </Flex>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  Total price: ${rate.price}
                </Copy>
              </Stack>
            </>
          </Stack>
        </SGridItem>
      </Grid>
    </GridContainer>
  )
}
