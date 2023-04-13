import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { RouteParams, ShippingType } from "@/shared/types"
import { useShipmentById } from "@/shared/data"
import { TRACKING } from "@/constants"

import { Title, GridContainer, HeaderBar, Hidden, Spacer } from "@/shared/components"
import {
  PackagesInfo,
  PackagesInfoListPlaceholder,
  PackagesInfoTablePlaceholder,
} from "@/tracking/components"

export const PackagesInfoContainer = () => {
  const navigate = useNavigate()
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const location = useLocation()
  const [shippingType, setShippingType] = useBoundStore(
    (state) => [state.shippingType, state.setShippingType],
    shallow,
  )

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
    return (
      <>
        <Hidden above="sm">
          <HeaderBar
            title="All packages"
            onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}`)}
            css={{ paddingRight: "$40" }}
          />
        </Hidden>
        <Hidden below="sm">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <Title scale={2} color="theme-b-n3" css={{ paddingRight: "$12" }}>
              All packages
            </Title>
          </GridContainer>
        </Hidden>
        <Spacer size={{ "@initial": 16, "@sm": 32 }} />
        <Hidden above="md">
          <PackagesInfoListPlaceholder shippingType={shippingType} />
        </Hidden>
        <Hidden below="md">
          <PackagesInfoTablePlaceholder shippingType={shippingType} />
        </Hidden>
        <Spacer size={{ "@initial": 24, "@md": 0 }} />
      </>
    )
  }

  const { packaging, parcels } = data

  return (
    <>
      <Hidden above="sm">
        <HeaderBar
          title="All packages"
          onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}`)}
          css={{ paddingRight: "$40" }}
        />
      </Hidden>
      <Hidden below="sm">
        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <Title scale={2} color="theme-b-n3" css={{ paddingRight: "$12" }}>
            All packages
          </Title>
        </GridContainer>
      </Hidden>
      <Spacer size={{ "@initial": 16, "@sm": 32 }} />
      <PackagesInfo packaging={packaging} parcels={parcels} shippingType={shippingType} />
      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
