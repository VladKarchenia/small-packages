import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

import { getShipmentByIdFn, shipmentApi } from "@/api/shipmentApi"
import { useShipmentActionContext } from "@/shared/state"
import { TrackingRouteParams } from "@/tracking/types"
import { formatShipmentResponseData } from "@/shared/utils"

import { Box } from "@/shared/components"
import { QuoteForm, ShipmentForm, ShippingType } from "@/shipment"

export const StepperContainer = ({ shippingType }: { shippingType: ShippingType }) => {
  const { shipmentId } = useParams<keyof TrackingRouteParams>() as TrackingRouteParams
  const setShipmentContext = useShipmentActionContext()
  const accessToken = window.localStorage.getItem("accessToken") || ""

  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipmentById"],
    () => getShipmentByIdFn(shipmentId),
    {
      enabled: false,
      // enabled: !!shipmentId,
      onSuccess: (shipment) => {
        setShipmentContext(formatShipmentResponseData(shipment.data))
      },
    },
  )

  useEffect(() => {
    if (accessToken && shipmentId) {
      if (!shipmentApi.defaults.headers.common["Authorization"]) {
        shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }

      refetch()
    }
  }, [accessToken, shipmentId, refetch])

  if (isLoading || isFetching) {
    return <Box>Loading</Box>
  }

  return shippingType === ShippingType.Quote ? <QuoteForm /> : <ShipmentForm />
}
