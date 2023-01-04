import { ShipmentStatus } from "@/shared/types"
import { ShipmentRoutePoint } from "@/tracking"

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRouteProps {
  routes: RouteInfo[]
}

export const ShipmentRoute = ({ routes }: IShipmentRouteProps) => {
  const fullRoutesList = routes.find((route) => route.status === ShipmentStatus.CANCELLED)
    ? ["Confirmed", "Booked", "Cancelled"]
    : ["Confirmed", "Booked", "Picked up", "In delivery", "Delivered"]

  const restRoutesList = fullRoutesList.filter(
    (route) => !routes.map((i) => i.status).includes(route),
  )

  return (
    <>
      {routes.map((route) => {
        return (
          <ShipmentRoutePoint
            key={route.status}
            status={route.status}
            date={route.date}
            isStepInProgress={!route.date}
            isStepCompleted={!!route.date}
          />
        )
      })}
      {restRoutesList.length > 0 &&
        restRoutesList.map((route) => {
          return <ShipmentRoutePoint key={route} status={route} />
        })}
    </>
  )
}
