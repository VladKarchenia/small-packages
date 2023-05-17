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
      <Copy scale={10} color="neutrals-5">
        {title}
      </Copy>
      <Link
        as="button"
        type="button"
        onClick={() => navigate(link)}
        css={{
          color: "$brand-blue-primary",
          hover: { color: "$brand-violet-light" },
          keyboardFocus: { color: "$brand-violet-light" },
          active: { color: "$brand-violet-primary" },
        }}
      >
        {link}
      </Link>
    </>
  )
}
