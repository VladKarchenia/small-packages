import { ShipmentCostsHeader } from "@/tracking"
import { Costs } from "@/shared/components"
import { ICost } from "@/shared/types"

interface IShipmentCostsProps {
  title: string
  price: number
  costs: ICost[]
}

export const ShipmentCosts = ({ title, price, costs }: IShipmentCostsProps) => {
  return (
    <>
      <ShipmentCostsHeader title={title} price={price} />
      <Costs costs={costs} />
    </>
  )
}
