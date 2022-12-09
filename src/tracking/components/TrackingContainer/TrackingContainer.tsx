import { useStateContext } from "@/shared/state"
import { ICost, Role, ShipmentStatus } from "@/shared/types"
import { GridContainer, HeaderBar, Spacer } from "@/shared/components"
import {
  ShipmentDetailsUnauthorized,
  ShipmentDetails,
  QuoteDetails,
  TrackingHeader,
} from "@/tracking"
import { ShippingType } from "@/shipment"
import { useNavigate } from "react-router-dom"

export const costs: ICost[] = [
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
export const SHIPMENT_DETAILS = {
  shipmentID: "20214-5Z",
  shipmentDate: "Oct 30, 2022, 7:29 PM",
  trackingNumber: "204-5Z87",
  shipmentURL: "https//www.gulfrelay/shipment/204-5Z87",
  arrivalDate: "18.10.2022",
  routes: [
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
    //   status: "Picked up",
    //   date: "19.10.2022 by 3:26 PM",
    // },
    // {
    //   status: "In delivery",
    //   date: "22.10.2022 by 7:19 PM",
    // },
    // {
    //   status: "Delivered",
    //   date: "23.10.2022 by 3:59 AM",
    // },
    // {
    //   status: "Eliminated",
    //   date: "18.10.2022 by 6:46 PM",
    // },
  ],
  shipmentLabelPDFLink: "https//www.google.ru/PDFLink",
  shipmentLabelZPLLink: "https//www.google.ru/ZPLLink",
  //shippingType: ShippingType.Quote,
  shippingType: ShippingType.Shipment,
  status: ShipmentStatus.Confirmed,
  //status: ShipmentStatus.Eliminated,
}

//TODO: "edit shipment" functionality
export const TrackingContainer = () => {
  const data = SHIPMENT_DETAILS
  // TODO: replace shippingType with the context later
  // TODO: replace status with the context later
  const { shippingType, status } = data

  const stateContext = useStateContext()
  const role = stateContext?.state.authUser?.role
  const navigate = useNavigate()

  if (shippingType === ShippingType.Quote) {
    return (
      <GridContainer css={{ paddingBottom: "$48" }}>
        <HeaderBar title="Quote details" onClick={() => navigate("/")} />
        <TrackingHeader
          shipmentID={data.shipmentID}
          shipmentDate={new Date(data.shipmentDate)}
          role={role}
          shippingType={shippingType as ShippingType}
          status={status}
        />
        <Spacer size={{ "@initial": 16, "@sm": 24 }} />
        <QuoteDetails shippingType={data.shippingType} status={data.status} />
      </GridContainer>
    )
  } else if (role === Role.Admin) {
    return (
      <GridContainer css={{ paddingBottom: "$48" }}>
        <HeaderBar title="Shipment details" onClick={() => navigate("/")} />
        <TrackingHeader
          shipmentID={data.shipmentID}
          shipmentDate={new Date(data.shipmentDate)}
          role={role}
          shippingType={shippingType as ShippingType}
          status={status}
        />
        <Spacer size={{ "@initial": 16, "@sm": 24 }} />
        <ShipmentDetails />
      </GridContainer>
    )
  } else
    return (
      <GridContainer css={{ paddingBottom: "$48" }}>
        <HeaderBar title="Shipment details" onClick={() => navigate("/")} />
        <TrackingHeader
          shipmentID={data.shipmentID}
          shipmentDate={new Date(data.shipmentDate)}
          role={role}
          shippingType={shippingType as ShippingType}
          status={status}
        />
        <Spacer size={{ "@initial": 16, "@sm": 24 }} />
        <ShipmentDetailsUnauthorized />
      </GridContainer>
    )
}
