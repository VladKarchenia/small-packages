import { latLng, Routing, ControlOptions } from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"

import { IGeolocation, IPerson } from "@/shared/types"

interface IRoutingControlProp extends ControlOptions {
  recipient: IPerson
  currentLocation: IGeolocation
}

const RoutingControl = ({ recipient, currentLocation }: IRoutingControlProp) => {
  const destinationCoordinates = latLng(
    parseFloat(recipient.fullAddress.latitude || "0"),
    parseFloat(recipient.fullAddress.longitude || "0"),
  )
  const currentCoordinates = latLng(
    parseFloat(currentLocation.latitude),
    parseFloat(currentLocation.longitude),
  )

  return Routing.control({
    show: false,
    fitSelectedRoutes: false,
    lineOptions: {
      extendToWaypoints: false,
      missingRouteTolerance: 0,
      styles: [
        {
          color: "black",
          opacity: 1,
          weight: 3,
          dashArray: "10",
        },
      ],
      addWaypoints: false,
    },
    plan: new Routing.Plan([currentCoordinates, destinationCoordinates], {
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => false,
    }),
  })
}

export const AdditionalRoute = createControlComponent(RoutingControl)
