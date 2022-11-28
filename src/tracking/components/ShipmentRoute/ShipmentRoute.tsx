import { ShipmentRoutePoint } from "@/tracking"

const RouteFull = ["Confirmed", "Booked", "Picked up", "In delivery", "Delivered"]
const RouteShort = ["Confirmed", "Booked", "Cancelled"]

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRouteProps {
  data: RouteInfo[]
}

export const ShipmentRoute = ({ data }: IShipmentRouteProps) => {
  const stepsCount = data.length - 1
  const isRoutShort = data.length === 3 && data[2].status === "Cancelled"

  return (
    <>
      {isRoutShort
        ? RouteShort.map((item, index) => {
            return (
              <ShipmentRoutePoint
                data={data[index]}
                stepName={item}
                key={index}
                isLastStep={index === stepsCount}
                isCompleted={true}
                isAwaiting={false}
              />
            )
          })
        : RouteFull.map((item, index) => {
            return (
              <ShipmentRoutePoint
                data={data[index]}
                stepName={item}
                key={index}
                isLastStep={index === RouteFull.length - 1}
                isCompleted={index < data.length - 1}
                isAwaiting={index === data.length - 1}
              />
            )
          })}
    </>
  )
}
