import { useState } from "react"
import { SHIPMENT_DETAILS, ShipmentCostsHeader } from "@/tracking"
import {
  GridContainer,
  PersonInfoShort,
  Stack,
  Copy,
  Spacer,
  ShortInfoLine,
  Flex,
} from "@/shared/components"

import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { useFormContext } from "react-hook-form"
import { ShipmentState } from "@/shared/state"
import { IconCalendar } from "@/shared/icons"
import format from "date-fns/format"
import { ShipmentDetailsShort, ShippingType } from "@/shipment"

export const SummaryInfo = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient, rate, shippingType, shipmentStatus, date, parcels } = watch()

  console.log(shippingType)

  return (
    <GridContainer fullBleed>
      <Stack space={24}>
        <div>
          <Copy scale={11} bold>
            Ship From
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
        </div>
        <div>
          <Copy scale={11} bold>
            Ship To
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
        </div>
        <div>
          <Copy scale={11} bold>
            Shipment Details
          </Copy>
          <Spacer size={16} />
          <Stack space={12}>
            {parcels.map((parcel: any, index: number) => (
              <Stack space={8} key={index}>
                {parcels.length > 1 ? (
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black" bold>
                    Parcel {index + 1}
                  </Copy>
                ) : null}
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Contents: </span> {parcel.content},
                </Copy>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Total Declared Value: </span> ${parcel.totalPrice},
                </Copy>
                <Flex align="center">
                  <Flex align="center" justify="center">
                    <IconCalendar size="xs" />
                  </Flex>
                  <Spacer size={8} horizontal />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height}{" "}
                    in;
                  </Copy>
                  <Spacer size={8} horizontal />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {parcel.weight} lb
                  </Copy>
                </Flex>
              </Stack>
            ))}
          </Stack>
        </div>
        <div>
          <Copy scale={11} bold>
            Ready Date
          </Copy>
          <Spacer size={16} />
          <Copy scale={11} bold>
            <ShortInfoLine
              icon={<IconCalendar size="xs" />}
              text={date ? format(date, "MMM d, yyyy hh:mm aa") : ""}
            />
          </Copy>
        </div>
        <div>
          <Copy scale={11} bold>
            Delivery Rates
          </Copy>
          <Spacer size={16} />
          <Copy scale={{ "@initial": 9, "@md": 9 }} color="system-black">
            Arrival date:
          </Copy>
          <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
          <Copy scale={{ "@initial": 9, "@md": 9 }} color="system-black">
            Total price: ${rate.price}
          </Copy>
        </div>
      </Stack>
    </GridContainer>
  )
}
