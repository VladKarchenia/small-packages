import { useMutation } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"

import { mediaQueries } from "@/config"
import { RouteParams, ShipmentStatus } from "@/shared/types"
import { useShipmentStateContext } from "@/shared/state"
import { useMedia } from "@/shared/hooks"
import { updateShipmentStatusFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"

import {
  AddressInfoShort,
  Button,
  Copy,
  Flex,
  GridContainer,
  Hidden,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import { IconCalendar, IconClock } from "@/shared/icons"
import { TrackingDetailsItem } from "@/tracking"

import { STrackingSection } from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

export const QuoteDetails = () => {
  const { date, parcels, recipient, sender, shipmentStatus } = useShipmentStateContext()
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const navigate = useNavigate()

  const { mutate: updateShipmentStatus, isLoading } = useMutation(
    () =>
      updateShipmentStatusFn(
        shipmentId,
        Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(ShipmentStatus.DRAFT)],
      ),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        navigate(`/edit/shipment/${id}`)
      },
    },
  )

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
        <Hidden below="md">
          <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
            Main Info
          </Title>
          <Spacer size={24} />
        </Hidden>
        <Stack space={24} dividers={isMediumAndAbove ? false : true}>
          <TrackingDetailsItem
            title="From where to where"
            titleScale={{ "@initial": 11, "@md": 9 }}
          >
            <AddressInfoShort fromAddress={sender.fullAddress} toAddress={recipient.fullAddress} />
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Pickup Date" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Flex align="center">
              <IconClock size="xs" css={{ paddingRight: "$8" }} />
              <Copy scale={9} color="system-black">
                {date ? format(date, "MMM d, yyyy hh:mm aa (OOO)") : ""}
              </Copy>
            </Flex>
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Shipment Details" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Stack space={12}>
              {parcels.map((parcel: any, index: number) => (
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
      {shipmentStatus !== ShipmentStatus.CANCELLED ? (
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

            onClick={() => updateShipmentStatus()}
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
