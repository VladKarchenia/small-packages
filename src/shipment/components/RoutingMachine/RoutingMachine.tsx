import * as L from "leaflet"
import "leaflet-routing-machine"
import { createControlComponent } from "@react-leaflet/core"

const Routing = () => {
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
    plan: new L.Routing.Plan([L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)], {
      addWaypoints: false,
      draggableWaypoints: false,
    }),
  })

  return routingControl
}

export const RoutingMachine = createControlComponent(Routing)
