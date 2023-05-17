import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { RouteParams, ShippingType } from "@/shared/types"
import { useShipmentById } from "@/shared/data"

import { Breadcrumbs, Flex, GridItem, Hidden } from "@/shared/components"
import { IllustrationSpinner } from "@/shared/illustrations"
import { QuoteForm, ShipmentForm } from "@/shipment/components"

export const StepperContainer = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const location = useLocation()
  const [shippingType, setShippingType] = useBoundStore(
    (state) => [state.shippingType, state.setShippingType],
    shallow,
  )

  const { isLoading } = useShipmentById(shipmentId)

  // we need this shippingType definition when we go directly to the create or edit link
  useEffect(() => {
    if (location.pathname.includes("quote")) {
      setShippingType(ShippingType.Quote)
    } else {
      setShippingType(ShippingType.Shipment)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <GridItem column={{ "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }}>
        <Flex
          align="center"
          justify="center"
          css={{
            height: `calc((var(--vh) * 100))`,
            textAlign: "center",
            "@sm": { height: "100%" },
          }}
        >
          <IllustrationSpinner css={{ height: "$32", width: "$32" }} />
        </Flex>
      </GridItem>
    )
  }

  return (
    <GridItem
      column={{
        "@initial": "1 / span 6",
        "@sm": "1 / span 12",
        "@lg": "1 / span 24",
      }}
      css={{ maxWidth: 1000 }}
    >
      <Hidden below="md">
        <Breadcrumbs />
      </Hidden>
      {shippingType === ShippingType.Quote ? <QuoteForm /> : <ShipmentForm />}
    </GridItem>
  )
}
