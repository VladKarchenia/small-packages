import { GridContainer, Spacer, Title, Copy, Flex, Stack, Link } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import {
  ShipmentLabels,
  ShipmentRoute,
  ShipmentURL,
  TrackingHeader,
  TrackingDetailsItem,
} from "./components"
import { AddressInfoInLine, Map, PersonInfoShortCard, ShortInfoLine } from "@/shared/components/app"
//styles
import { STrackingSection } from "./Tracking.styles"

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
  shipmentLabelPDFLink: "https//www.google.ru/search",
  shipmentLabelZPLLink: "https//www.google.ru/search",
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
            <Stack space={24} dividers={true}>
              <>
                <TrackingDetailsItem title="Tracking number" titleIndent={8}>
                  <Copy scale={8} color="system-black">
                    {data.trackingNumber}
                  </Copy>
                </TrackingDetailsItem>
                <Spacer size={20} />
                <TrackingDetailsItem title="Shipment URL" titleIndent={8}>
                  <ShipmentURL url={data.shipmentURL} />
                </TrackingDetailsItem>
                <Spacer size={16} />
                <TrackingDetailsItem title="From where to where">
                  <AddressInfoInLine fromAddress={data.from} toAddress={data.to} />
                </TrackingDetailsItem>
              </>

              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12}>
                  <Copy scale={9} color="system-black">
                    Arrival date: {data.arrivalDate}
                  </Copy>
                  <Copy scale={9} color="system-black">
                    Pick up date: {data.pickUpDate}
                  </Copy>
                  <ShortInfoLine icon={<IconCalendar size="xs" />} text={data.deliveryCompany} />
                </Stack>
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details">
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
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Route">
                <ShipmentRoute data={data.route} />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Sender’s info">
                <PersonInfoShortCard
                  person={"sender"}
                  sender={data.sendersInfo}
                  recipient={data.recipientsInfo}
                />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Recipient’s info">
                <PersonInfoShortCard
                  person={"recipient"}
                  sender={data.sendersInfo}
                  recipient={data.recipientsInfo}
                />
              </TrackingDetailsItem>
            </Stack>
          </STrackingSection>
        </GridContainer>
        {/*TODO: add Coast component when it'll be ready*/}
        {/*<GridContainer>*/}
        {/*  <STrackingSection>*/}
        {/*    <Title>Coast</Title>*/}
        {/*  </STrackingSection>*/}
        {/*</GridContainer>*/}
        <GridContainer>
          <STrackingSection>
            <Title>Shipment label</Title>
            <Copy scale={9} color="neutrals-7">
              Shipment label must be printed and attached to a package before it is picked up
            </Copy>
            <Spacer size={24} />
            <ShipmentLabels
              pdfLabel={data.shipmentLabelPDFLink}
              zplLabel={data.shipmentLabelZPLLink}
            />
          </STrackingSection>
        </GridContainer>
        <GridContainer>
          <Link href="/">
            <Copy scale={8} color="system-black" bold>
              Back to Home page
            </Copy>
          </Link>
        </GridContainer>
      </Stack>
    </GridContainer>
  )
}
