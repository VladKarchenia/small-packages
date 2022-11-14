import { Copy, Link } from "@/shared/components"

interface IShipmentLabelProps {
  title: string
  link: string
}

export const ShipmentLabel = ({ title, link }: IShipmentLabelProps) => {
  return (
    <>
      <Copy scale={10}>{title}</Copy>
      <Link href={link}>{link}</Link>
    </>
  )
}
