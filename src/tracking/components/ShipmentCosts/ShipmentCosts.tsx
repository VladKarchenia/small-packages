import { useState } from "react"
import { ShipmentCostsHeader } from "@/tracking"
import { Costs } from "@/shared/components"
import { ICost } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"

interface IShipmentCostsProps {
  title: string
  price: number
  costs: ICost[]
}

export const ShipmentCosts = ({ title, price, costs }: IShipmentCostsProps) => {
  const [showCostsDetails, setShowCostsDetails] = useState(false)
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  const handleShowDetailsClick = () => {
    setShowCostsDetails(!showCostsDetails)
  }

  return (
    <>
      <ShipmentCostsHeader
        title={title}
        price={price}
        showCostsDetails={showCostsDetails}
        handleShowDetailsClick={handleShowDetailsClick}
      />
      {isSmallAndAbove || showCostsDetails ? <Costs costs={costs} /> : null}
    </>
  )
}
