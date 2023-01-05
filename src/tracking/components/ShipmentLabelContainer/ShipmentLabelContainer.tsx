import { Stack, Divider } from "@/shared/components"
import { ShipmentLabel } from "../ShipmentLabel"

interface IShipmentLabelContainerProps {
  pdfLabel: string
  zplLabel: string
  pdfReturnLabel: string
  zplReturnLabel: string
}

export const ShipmentLabelContainer = ({
  pdfLabel,
  zplLabel,
  pdfReturnLabel,
  zplReturnLabel,
}: IShipmentLabelContainerProps) => {
  return (
    <Stack space={{ "@initial": 16, "@md": 24 }}>
      <ShipmentLabel title="Label in PDF" link={pdfLabel} />
      <ShipmentLabel title="Label in ZPL" link={zplLabel} />
      <Divider />
      <ShipmentLabel title="Return Label in PDF" link={pdfReturnLabel} />
      <ShipmentLabel title="Return Label in ZPL" link={zplReturnLabel} />
    </Stack>
  )
}
