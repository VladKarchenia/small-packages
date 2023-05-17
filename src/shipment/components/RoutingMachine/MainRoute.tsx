import { latLng, Routing, ControlOptions } from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"

import { IGeolocation, IPerson } from "@/shared/types"

interface IRoutingControlProp extends ControlOptions {
  sender: IPerson
  recipient: IPerson
  currentLocation: IGeolocation
}

const RoutingControl = ({ sender, recipient, currentLocation }: IRoutingControlProp) => {
  const originCoordinates = latLng(
    parseFloat(sender.fullAddress.latitude || "0"),
    parseFloat(sender.fullAddress.longitude || "0"),
  )
  const destinationCoordinates = latLng(
    parseFloat(recipient.fullAddress.latitude || "0"),
    parseFloat(recipient.fullAddress.longitude || "0"),
  )
  const currentCoordinates = currentLocation.displayName
    ? latLng(parseFloat(currentLocation.latitude), parseFloat(currentLocation.longitude))
    : null

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
          dashArray: currentCoordinates ? "0" : "10",
        },
      ],
      addWaypoints: false,
    },
    plan: new Routing.Plan(
      [originCoordinates, currentCoordinates ? currentCoordinates : destinationCoordinates],
      {
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => false,
      },
    ),
  })
}

export const MainRoute = createControlComponent(RoutingControl)
