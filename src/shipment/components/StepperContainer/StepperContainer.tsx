import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "react-query"

import { getShipmentByIdFn, shipmentApi } from "@/api/shipmentApi"
import { useShipmentActionContext, useShipmentStateContext } from "@/shared/state"
import { RouteParams } from "@/shared/types"
import { formatShipmentResponseData } from "@/shared/utils"

import { Flex, GridItem } from "@/shared/components"
import { QuoteForm, ShipmentForm, ShippingType } from "@/shipment"
import { IllustrationSpinner } from "@/shared/illustrations"

export const StepperContainer = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const location = useLocation()
  const { shippingType } = useShipmentStateContext()

  const { setShipmentData, setShippingType } = useShipmentActionContext()
  const accessToken = localStorage.getItem("accessToken") || ""

  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipmentById"],
    () => getShipmentByIdFn(shipmentId),
    {
      enabled: false,
      // enabled: !!shipmentId,
      onSuccess: (shipment) => {
        setShipmentData(formatShipmentResponseData(shipment.data))
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

  useEffect(() => {
    if (location.pathname.includes("create")) {
      if (location.pathname.includes("quote")) {
        setShippingType(ShippingType.Quote)
      } else {
        setShippingType(ShippingType.Shipment)
      }
    }
  }, [])

  if (isLoading || isFetching || !shippingType) {
    return (
      <GridItem column={{ "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }}>
        <Flex
          align="center"
          justify="center"
          css={{ height: `calc((var(--vh) * 100) - $128 - $96)`, textAlign: "center" }}
        >
          <IllustrationSpinner css={{ display: "block", height: "$32", width: "$32" }} />
        </Flex>
      </GridItem>
    )
  }

  return (
    <GridItem
      column={{
        "@initial": "1 / span 6",
        "@sm": "1 / span 12",
        "@lg": "1 / span 16",
      }}
    >
      {shippingType === ShippingType.Quote ? <QuoteForm /> : <ShipmentForm />}
    </GridItem>
  )
}
