import { useNavigate } from "react-router-dom"

import { Copy, Link } from "@/shared/components"

interface IShipmentLabelProps {
  title: string
  link: string
}

export const ShipmentLabel = ({ title, link }: IShipmentLabelProps) => {
  const navigate = useNavigate()

  return (
    <>
      <Copy scale={{ "@initial": 10, "@sm": 9 }}>{title}</Copy>
      <Link scale={{ "@initial": 10, "@sm": 8 }} onClick={() => navigate(link)} underline blue>
        {link}
      </Link>
    </>
  )
}
