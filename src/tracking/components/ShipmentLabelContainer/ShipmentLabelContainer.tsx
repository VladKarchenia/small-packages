import { Stack } from "@/shared/components"
import { ShipmentLabel } from "../ShipmentLabel"

interface IShipmentLabelContainerProps {
  pdfLabel: string
  zplLabel: string
}

export const ShipmentLabelContainer = ({ pdfLabel, zplLabel }: IShipmentLabelContainerProps) => {
  return (
    <Stack space={{ "@initial": 16, "@md": 24 }}>
      <ShipmentLabel title="Label in PDF" link={pdfLabel} />
      <ShipmentLabel title="Label in ZPL" link={zplLabel} />
    </Stack>
  )
}
