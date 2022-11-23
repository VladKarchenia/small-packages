import {  useState } from "react"
import { ShipmentCostsHeader } from "@/tracking"
import { Costs } from "@/shared/components"
import { ICost } from "@/shared/types"

interface IShipmentCostsProps {
  title: string
  price: number
  costs: ICost[]
}

export const ShipmentCosts = ({ title, price, costs }: IShipmentCostsProps) => {
  const [showCostsDetails, setShowCostsDetails] = useState(false);

  const handleShowDetailsClick = () => {
    setShowCostsDetails(!showCostsDetails);
  };

  return (
    <>
      <ShipmentCostsHeader title={title} price={price} showCostsDetails={showCostsDetails} handleShowDetailsClick={handleShowDetailsClick}/>
      {showCostsDetails && <Costs costs={costs} />}
    </>
  )
}
