import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

import { getShipmentByIdFn, shipmentApi } from "@/api/shipmentApi"
import { ShippingType } from "@/shipment"
import { ICost, Role } from "@/shared/types"
import { TrackingRouteParams } from "@/tracking/types"
import { useShipmentActionContext, useShipmentStateContext } from "@/shared/state"
import { formatShipmentResponseData } from "@/shared/utils"

import {
  ShipmentDetailsUnauthorized,
  ShipmentDetails,
  QuoteDetails,
  TrackingMain,
} from "@/tracking"
import { Flex } from "@/shared/components"
import { IllustrationSpinner } from "@/shared/illustrations"

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
  const { shippingType } = useShipmentStateContext()
  const { shipmentId } = useParams<keyof TrackingRouteParams>() as TrackingRouteParams
  const { setShipmentData } = useShipmentActionContext()

  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipmentById"],
    () => getShipmentByIdFn(shipmentId),
    {
      enabled: false,
      // enabled: !!shipmentId,
      onSuccess: (shipment) => {
        return setShipmentData(formatShipmentResponseData(shipment.data))
      },
    },
  )

  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority
  const accessToken = localStorage.getItem("accessToken") || ""

  useEffect(() => {
    if (accessToken) {
      if (!shipmentApi.defaults.headers.common["Authorization"]) {
        shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }

      refetch()
    }
  }, [accessToken, refetch])

  if (isLoading || isFetching || !shippingType) {
    return (
      <Flex
        align="center"
        justify="center"
        css={{ height: `calc((var(--vh) * 100) - $128 - $96)`, textAlign: "center" }}
      >
        <IllustrationSpinner css={{ display: "block", height: "$32", width: "$32" }} />
      </Flex>
    )
  }

  // TODO: need to add condition to show this component
  // return (
  //   <TrackingMain headerTitle="Shipment details" shipmentDate={new Date()}>
  //     <ShipmentDetailsUnauthorized />
  //   </TrackingMain>
  // )

  if (shippingType === ShippingType.Quote) {
    return (
      <TrackingMain headerTitle="Quote detail" shipmentDate={new Date()}>
        <QuoteDetails />
      </TrackingMain>
    )
  }

  return (
    <TrackingMain headerTitle="Shipment details" shipmentDate={new Date()}>
      <ShipmentDetails />
    </TrackingMain>
  )
}
