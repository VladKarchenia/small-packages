import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import {
  GridContainer,
  Spacer,
  Title,
  Copy,
  Flex,
  Stack,
  AddressInfoShort,
  Map,
  PersonInfoShort,
  ShortInfoLine,
  HeaderBar,
  Button,
} from "@/shared/components"
import { IconCalendar, IconClock } from "@/shared/icons"
import { useShipmentStateContext, useStateContext } from "@/shared/state"
import { ICost, Role, ShipmentStatus } from "@/shared/types"
import {
  TrackingHeader,
  TrackingDetailsItem,
  ShipmentURL,
  ShipmentRoute,
  ShipmentLabelContainer,
  ShipmentCosts,
} from "@/tracking"
import { STrackingSection } from "./TrackingContainer.styles"
import { ShippingType } from "@/shipment"

const costs: ICost[] = [
  {
    name: "Base rate",
    value: 1300,
  },
  {
    name: "Fuel",
    value: 140,
  },
  {
    name: "Accessorial",
    value: 0,
  },
  {
    name: "Other",
    value: 40,
  },
  {
    name: "Service",
    value: 10,
  },
  {
    name: "Tax",
    value: 50,
  },
]

const SHIPMENT_DETAILS = {
  shipmentID: "20214-5Z",
  shipmentDate: "Oct 30, 2022, 7:29 PM",
  trackingNumber: "204-5Z87",
  shipmentURL: "https//www.gulfrelay/shipment/204-5Z87",
  arrivalDate: "18.10.2022",
  route: [
    {
      status: "Confirmed",
      date: "18.10.2022 by 5:46 PM",
    },
    {
      status: "Booked",
      date: "18.10.2022 by 6:26 PM",
    },
    {
      status: "Picked up",
      date: "",
    },
    // {
    //   status: "Cancelled",
    //   date: "18.10.2022 by 6:46 PM",
    // },
  ],
  shipmentLabelPDFLink: "https//www.google.ru/PDFLink",
  shipmentLabelZPLLink: "https//www.google.ru/ZPLLink",
  // shippingType: "quote",
  shippingType: "shipment",
  status: ShipmentStatus.Confirmed,
  // status: ShipmentStatus.Eliminated,
}

//TODO: add routing, "edit shipment" functionality, show content according user role
export const TrackingContainer = () => {
  const data = SHIPMENT_DETAILS
  // TODO: replace shippingType with the context later
  // TODO: replace status with the context later
  const { shippingType, status } = data

  const stateContext = useStateContext()
  const role = stateContext?.state.authUser?.role
  const navigate = useNavigate()
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()

  if (shippingType === ShippingType.Quote) {
    return (
      <GridContainer fullBleed css={{ paddingBottom: "$48" }}>
        <HeaderBar title="Quote details" onClick={() => navigate("/")} />
        <Stack space={16}>
          <TrackingHeader
            shipmentID={data.shipmentID}
            shipmentDate={new Date(data.shipmentDate)}
            role={role}
            shippingType={shippingType as ShippingType}
            status={status}
          />
          <GridContainer>
            <STrackingSection>
              <Stack space={24} dividers>
                <TrackingDetailsItem title="From where to where">
                  <AddressInfoShort
                    fromAddress={sender.fullAddress.location}
                    toAddress={recipient.fullAddress.location}
                  />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Pickup Date">
                  <Flex align="center">
                    <IconClock size="xs" css={{ paddingRight: "$8" }} />
                    <Copy scale={9} color="system-black">
                      {date ? format(date, "dd.MM.yyyy hh:mm aa") : ""}
                    </Copy>
                  </Flex>
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Shipment Details">
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
                <Spacer size={24} />
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
        </Stack>
      </GridContainer>
    )
  }
  return (
    <GridContainer fullBleed css={{ paddingBottom: "$48" }}>
      <HeaderBar title="Shipment details" onClick={() => navigate("/")} />
      <Stack space={16}>
        <TrackingHeader
          shipmentID={data.shipmentID}
          shipmentDate={new Date(data.shipmentDate)}
          role={role}
          shippingType={shippingType as ShippingType}
          status={status}
        />
        <Map />
        <GridContainer>
          <STrackingSection>
            <Stack space={24} dividers>
              <>
                <TrackingDetailsItem title="Tracking number" titleIndent={4}>
                  <ShipmentURL url={data.shipmentURL} value={data.trackingNumber} />
                </TrackingDetailsItem>
                <Spacer size={24} />
                <TrackingDetailsItem title="From where to where">
                  <AddressInfoShort
                    fromAddress={sender.fullAddress.location}
                    toAddress={recipient.fullAddress.location}
                  />
                </TrackingDetailsItem>
              </>

              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12}>
                  {role === Role.Admin ? (
                    <Copy scale={9} color="system-black">
                      Pickup date: {date ? format(date, "dd.MM.yyyy hh:mm aa") : ""}
                    </Copy>
                  ) : null}
                  <Copy scale={9} color="system-black">
                    Arrival date: {data.arrivalDate}
                  </Copy>
                  <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                </Stack>
              </TrackingDetailsItem>
              {role === Role.Admin ? (
                <TrackingDetailsItem title="Shipment Details">
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
              ) : null}

              <TrackingDetailsItem title="Route">
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute data={data.route} />
              </TrackingDetailsItem>

              {role === Role.Admin ? (
                <TrackingDetailsItem title="Sender’s info">
                  <PersonInfoShort person={"sender"} sender={sender} recipient={recipient} />
                </TrackingDetailsItem>
              ) : null}
              {role === Role.Admin ? (
                <TrackingDetailsItem title="Recipient’s info">
                  <PersonInfoShort person={"recipient"} sender={sender} recipient={recipient} />
                </TrackingDetailsItem>
              ) : null}
            </Stack>
          </STrackingSection>
        </GridContainer>

        {/*TODO: check and update Costs component when back-end and design will be established*/}
        {role === Role.Admin ? (
          <GridContainer>
            <STrackingSection>
              <ShipmentCosts title="Costs" price={rate.price} costs={costs} />
            </STrackingSection>
          </GridContainer>
        ) : null}
        {role === Role.Admin ? (
          <GridContainer>
            <STrackingSection>
              <Title as="h3" scale={8}>
                Shipment label
              </Title>
              <Spacer size={16} />
              <Copy scale={9}>
                Shipment label must be printed and attached to a package before it is picked up
              </Copy>
              <Spacer size={24} />
              <ShipmentLabelContainer
                pdfLabel={data.shipmentLabelPDFLink}
                zplLabel={data.shipmentLabelZPLLink}
              />
            </STrackingSection>
          </GridContainer>
        ) : null}
      </Stack>
    </GridContainer>
  )
}
