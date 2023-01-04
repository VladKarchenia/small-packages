import * as L from "leaflet"
import "leaflet-routing-machine"
import { createControlComponent } from "@react-leaflet/core"
import { useShipmentStateContext } from "@/shared/state"

// interface IRoutingProps {
//   senderLat: string
//   senderLong: string
//   recipientLat: string
//   recipientLong: string
// }

const Routing = () => {
  const { recipient, sender } = useShipmentStateContext()

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
        L.latLng(parseFloat(sender.fullAddress.latitude), parseFloat(sender.fullAddress.longitude)),
        // TODO: add here current point if it exists
        L.latLng(
          parseFloat(recipient.fullAddress.latitude),
          parseFloat(recipient.fullAddress.longitude),
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
