import { useFormContext } from "react-hook-form"
import format from "date-fns/format"

import { IParcel } from "@/shared/types"
import { ShipmentState } from "@/shared/state"

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
import { IconCalendar } from "@/shared/icons"

import { SGridItem } from "./Receipt.styles"

export const Receipt = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient, rate, date, parcels } = watch()

  return (
    <GridContainer fullBleed>
      <Grid columns={{ "@initial": "1fr", "@md": "1fr 1fr" }} gap={{ "@initial": 24, "@sm": 16 }}>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship From
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"sender"} sender={sender} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship To
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"recipient"} recipient={recipient} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Shipment details
          </Copy>
          <Spacer size={16} />
          <Stack space={12}>
            {parcels.map((parcel: IParcel, index: number) => (
              <Stack space={8} key={index}>
                {parcels.length > 1 ? (
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black" bold>
                    Parcel {index + 1}
                  </Copy>
                ) : null}
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Contents: </span> {parcel.content}
                </Copy>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Total Declared Value: </span> ${parcel.totalPrice}
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
        </SGridItem>
        <SGridItem>
          <Stack space={24}>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Ready date
              </Copy>
              <Spacer size={16} />
              <ShortInfoLine
                icon={<IconCalendar size="xs" />}
                text={format(date, "MMM d, yyyy hh:mm aa (OOO)")}
              />
            </>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Delivery rates
              </Copy>
              <Spacer size={16} />
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  Arrival date: {format(date, "MMM d, yyyy hh:mm aa (OOO)")}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
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
