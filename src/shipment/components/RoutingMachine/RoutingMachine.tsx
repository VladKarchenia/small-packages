import * as L from "leaflet"
import "leaflet-routing-machine"
import { createControlComponent } from "@react-leaflet/core"
import { useParams } from "react-router-dom"

import { useShipmentById } from "@/shared/data"
import { RouteParams } from "@/shared/types"

const Routing = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const { data } = useShipmentById(shipmentId)

  const routingControl = L.Routing.control({
    show: false,
    fitSelectedRoutes: true,
    lineOptions: {
      extendToWaypoints: false,
      missingRouteTolerance: 0,
      styles: [
        {
          color: "blue",
          opacity: 0.5,
          weight: 6,
        },
      ],
      addWaypoints: false,
    },
    plan: new L.Routing.Plan(
      [
        L.latLng(
          parseFloat(data?.sender.fullAddress.latitude || ""),
          parseFloat(data?.sender.fullAddress.longitude || ""),
        ),
        // TODO: add here current point if it exists
        L.latLng(
          parseFloat(data?.recipient.fullAddress.latitude || ""),
          parseFloat(data?.recipient.fullAddress.longitude || ""),
        ),
      ],
      {
        addWaypoints: false,
        draggableWaypoints: false,
      },
    ),
  })

  return routingControl
}

export const RoutingMachine = createControlComponent(Routing)
