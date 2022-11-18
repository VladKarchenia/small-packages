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
} from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import { TrackingHeader } from "../TrackingHeader"
import { TrackingDetailsItem } from "../TrackingDetailsItem"
import { ShipmentURL } from "../ShipmentURL"
import { ShipmentRoute } from "../ShipmentRoute"
import { ShipmentLabelContainer } from "../ShipmentLabelContainer"
import { STrackingSection } from "./TrackingContainer.styles"

const SHIPMENT_DETAILS = {
  shipmentID: "20214-5Z",
  shipmentDate: "Oct 30, 2022, 7:29 PM",
  trackingNumber: "204-5Z87",
  shipmentURL: "https//www.gulfrelay/shipment/204-5Z87",
  from: "USA, New York",
  to: "USA, Los Angeles",
  arrivalDate: "18.10.2022",
  pickUpDate: "17.10.2022",
  deliveryCompany: "UPS Express Delivery",
  shipmentName: "Product, furniture",
  shipmentCoast: "$12.54",
  shipmentSize: "42x32x10",
  shipmentWeight: "0,2",
  route: [
    {
      status: "Order is processed",
      date: "18.10.2022 by 5:46 PM",
    },
    {
      status: "Order has been paid",
      date: "18.10.2022 by 6:26 PM",
    },
    {
      status: "Order confirmation awaiting",
      date: "",
    },
  ],
  sendersInfo: {
    name: "Kevin Harris",
    phone: "212-639-9675",
    fullAddress: {
      location: "Cerritos, 278 Los Cerritos Mall",
      country: "United States",
      postCode: "90703",
      state: "California",
      city: "Cerritos",
      address: "278 Los Cerritos Mall",
      isResidential: false,
    },
    company: "USA, New York",
  },
  recipientsInfo: {
    name: "Dexter Morissette",
    phone: "806-622-3862",
    company: "USA, Texas",
    fullAddress: {
      location: "Redondo Beach, 512 N Pacific Coast Hwy",
      country: "United States",
      postCode: "90277",
      state: "California",
      city: "Redondo Beach",
      address: "512 N Pacific Coast Hwy",
      isResidential: false,
    },
  },
  shipmentLabelPDFLink: "https//www.google.ru/PDFLink",
  shipmentLabelZPLLink: "https//www.google.ru/ZPLLink",
}

//TODO: add routing, "edit shipment" functionality, show content according user role
export const TrackingContainer = () => {
  const data = SHIPMENT_DETAILS

  return (
    <GridContainer fullBleed css={{ paddingBottom: "$48" }}>
      <Stack space={16}>
        <TrackingHeader shipmentID={data.shipmentID} shipmentDate={data.shipmentDate} />
        <Map />
        <GridContainer>
          <STrackingSection>
            <Stack space={24} dividers>
              <>
                <TrackingDetailsItem title="Tracking number" titleIndent={4}>
                  <Copy scale={8} color="system-black" bold>
                    {data.trackingNumber}
                  </Copy>
                </TrackingDetailsItem>
                <Spacer size={20} />
                <TrackingDetailsItem title="Shipment URL" titleIndent={4}>
                  <ShipmentURL url={data.shipmentURL} />
                </TrackingDetailsItem>
                <Spacer size={24} />
                <TrackingDetailsItem title="From where to where">
                  <AddressInfoShort fromAddress={data.from} toAddress={data.to} />
                </TrackingDetailsItem>
              </>

              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12}>
                  <Copy scale={9} color="system-black">
                    Pick up date: {data.pickUpDate}
                  </Copy>
                  <Copy scale={9} color="system-black">
                    Arrival date: {data.arrivalDate}
                  </Copy>
                  <ShortInfoLine icon={<IconCalendar size="xs" />} text={data.deliveryCompany} />
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details">
                <Stack space={12}>
                  <Copy scale={9} color="system-black">
                    Product, furniture, $12.54
                  </Copy>
                  <Flex align="center">
                    <Flex align="center" justify="center">
                      <IconCalendar size="xs" />
                    </Flex>
                    <Spacer size={8} horizontal />
                    <Copy scale={9} color="system-black" bold>
                      42x32x10 cm;
                    </Copy>
                    <Spacer size={8} horizontal />
                    <Copy scale={9} color="system-black" bold>
                      0,5 kg
                    </Copy>
                  </Flex>
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route">
                {/* TODO: Fix Route block after BE data and final design */}
                <ShipmentRoute data={data.route} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Sender’s info">
                <PersonInfoShort
                  person={"sender"}
                  sender={data.sendersInfo}
                  recipient={data.recipientsInfo}
                />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Recipient’s info">
                <PersonInfoShort
                  person={"recipient"}
                  sender={data.sendersInfo}
                  recipient={data.recipientsInfo}
                />
              </TrackingDetailsItem>
            </Stack>
          </STrackingSection>
        </GridContainer>
        {/*TODO: add Cost component when it'll be ready*/}
        {/*<GridContainer>*/}
        {/*  <STrackingSection>*/}
        {/*    <Title>Coast</Title>*/}
        {/*  </STrackingSection>*/}
        {/*</GridContainer>*/}
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
      </Stack>
    </GridContainer>
  )
}
