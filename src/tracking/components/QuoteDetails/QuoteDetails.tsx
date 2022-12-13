import { format } from "date-fns"
import {
  AddressInfoShort,
  Button,
  Copy,
  Flex,
  GridContainer,
  Spacer,
  Stack,
} from "@/shared/components"
import { IconCalendar, IconClock } from "@/shared/icons"
import { useShipmentStateContext } from "@/shared/state"
import { ShipmentStatus } from "@/shared/types"
import { TrackingDetailsItem } from "@/tracking"
import { ShippingType } from "@/shipment"
import { STrackingSection } from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

interface IQuoteDetailsProps {
  shippingType?: ShippingType
  status: ShipmentStatus
}

export const QuoteDetails = ({ status, shippingType }: IQuoteDetailsProps) => {
  const { date, parcels, recipient, sender } = useShipmentStateContext()

  return (
    <GridContainer
      fullBleed={{ "@initial": false, "@sm": true }}
      css={{
        "@initial": {
          maxWidth: "100%",
          paddingBottom: "$48",
        },
        "@md": {
          maxWidth: "565px",
          marginLeft: "initial",
        },
      }}
    >
      <STrackingSection>
        <Stack space={24} dividers>
          <TrackingDetailsItem
            title="From where to where"
            titleScale={{ "@initial": 11, "@md": 9 }}
          >
            <AddressInfoShort
              fromAddress={sender.fullAddress.location}
              toAddress={recipient.fullAddress.location}
            />
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Pickup Date" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Flex align="center">
              <IconClock size="xs" css={{ paddingRight: "$8" }} />
              <Copy scale={9} color="system-black">
                {date ? format(date, "MMM d, yyyy hh:mm aa") : ""}
              </Copy>
            </Flex>
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Shipment Details" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Stack space={12}>
              {parcels.map((parcel, index) => (
                <Stack space={8} key={index}>
                  {parcels.length > 1 ? (
                    <Copy scale={9} color="system-black" bold>
                      Parcel {index + 1}
                    </Copy>
                  ) : null}
                  <Copy scale={9} color="system-black">
                    {parcel.content}, ${parcel.totalPrice}, {parcel.packageType},{" "}
                    {parcel.pickupType}
                  </Copy>
                  <Flex align="center">
                    <Flex align="center" justify="center">
                      <IconCalendar size="xs" />
                    </Flex>
                    <Spacer size={8} horizontal />
                    <Copy scale={9} color="system-black">
                      {parcel.dimensions.length}x{parcel.dimensions.width}x
                      {parcel.dimensions.height} in;
                    </Copy>
                    <Spacer size={8} horizontal />
                    <Copy scale={9} color="system-black">
                      {parcel.weight} lb
                    </Copy>
                  </Flex>
                </Stack>
              ))}
            </Stack>
          </TrackingDetailsItem>
        </Stack>
      </STrackingSection>
      {status !== ShipmentStatus.Eliminated ? (
        <>
          <Spacer size={32} />
          <Button
            type="button"
            full
            // TODO: disabled conditions?
            // disabled={
            //   (shippingType === ShippingType.Quote && !date) ||
            //   (shippingType === ShippingType.Shipment && !rate.name)
            // }

            // TODO: add click handler
            onClick={() => console.log("Create a shipment click")}
          >
            <Copy as="span" scale={8} color="system-white" bold>
              Create a shipment
            </Copy>
          </Button>
        </>
      ) : null}
    </GridContainer>
  )
}