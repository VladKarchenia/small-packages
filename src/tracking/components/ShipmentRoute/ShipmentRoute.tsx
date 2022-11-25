import { ShipmentRoutePoint } from "@/tracking"

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRouteProps {
  data: RouteInfo[]
}

export const ShipmentRoute = ({ data }: IShipmentRouteProps) => {
  console.log(data);
  const stepsCount  = data.length - 1;
  return (
    <>
      {data.map((point, index) => {
        return (
          <ShipmentRoutePoint data={point} key={index} isLastStep={index === stepsCount}/>
        )
      })}
    </>
  )
}
