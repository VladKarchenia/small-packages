import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { ICost, RouteParams, ShippingType } from "@/shared/types"
import { useShipmentById } from "@/shared/data"

import {
  ShipmentDetails,
  QuoteDetails,
  TrackingMain,
  TrackingPlaceholderShipment,
  TrackingPlaceholderQuote,
} from "@/tracking/components"

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
    //   status: "DELIVERED",
    //   date: "23.10.2022 by 3:59 AM",
    // },
    // {
    //   status: "CANCELLED",
    //   date: "18.10.2022 by 6:46 PM",
    // },
  ],
  shipmentLabelPDFLink: "https//www.google.ru/PDFLink",
  shipmentLabelZPLLink: "https//www.google.ru/ZPLLink",
  shipmentReturnLabelPDFLink: "https//www.google.ru/PDFReturnLink",
  shipmentReturnLabelZPLLink: "https//www.google.ru/ZPLReturnLink",
}

export const TrackingContainer = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const location = useLocation()
  // const [user] = useAuthStore((state) => [state.user])
  const [shippingType, setShippingType] = useBoundStore(
    (state) => [state.shippingType, state.setShippingType],
    shallow,
  )
  // const role = user?.authorities?.[0]?.authority

  const { isLoading, data } = useShipmentById(shipmentId)

  // we need this shippingType definition when we go directly to the tracking link
  useEffect(() => {
    if (location.pathname.includes("quote")) {
      setShippingType(ShippingType.Quote)
    } else {
      setShippingType(ShippingType.Shipment)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading || !data) {
    if (shippingType === ShippingType.Quote) {
      return <TrackingPlaceholderQuote />
    }

    // TODO: need to add condition to show this component
    // if (shippingType === ShippingType.Shipment) {
    //   return <TrackingPlaceholderShipmentUnauthorized />
    // }

    return <TrackingPlaceholderShipment />
  }

  const { sender, recipient, date, rate, shipmentStatus, createdAt, packaging } = data

  if (shippingType === ShippingType.Quote) {
    return (
      <TrackingMain
        headerTitle="Quote details"
        sender={sender}
        createdAt={createdAt}
        shipmentStatus={shipmentStatus}
      >
        <QuoteDetails
          sender={sender}
          recipient={recipient}
          packaging={packaging}
          date={date}
          shipmentStatus={shipmentStatus}
          shipmentId={shipmentId}
          shippingType={shippingType}
        />
      </TrackingMain>
    )
  }

  // TODO: need to add condition to show this component
  // return (
  //   <TrackingMain headerTitle="Shipment details" createdAt={createdAt}>
  //     <ShipmentDetailsUnauthorized sender={sender} recipient={recipient} rate={rate} />
  //   </TrackingMain>
  // )

  return (
    <TrackingMain
      headerTitle="Shipment details"
      sender={sender}
      createdAt={createdAt}
      shipmentStatus={shipmentStatus}
    >
      <ShipmentDetails
        sender={sender}
        recipient={recipient}
        packaging={packaging}
        date={date}
        rate={rate}
        shipmentId={shipmentId}
        shippingType={shippingType}
      />
    </TrackingMain>
  )
}
