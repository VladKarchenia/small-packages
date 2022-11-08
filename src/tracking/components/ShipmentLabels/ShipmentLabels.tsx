import { Copy, Link, Stack } from "@/shared/components"

type ShipmentLabelsProps = {
  pdfLabel: string,
  zplLabel: string,
}

export const ShipmentLabels = ({pdfLabel,zplLabel}: ShipmentLabelsProps ) => {
  return(
    <Stack space={20}>
      <>
        <Copy scale={10}  color="neutrals-7">Label in PDF</Copy>
        <Link  href="#">{pdfLabel}</Link>
        </>
      <>
        <Copy scale={10}  color="neutrals-7" >Label in ZPL</Copy>
        <Link href="#">{zplLabel}</Link>
      </>
    </Stack>
  )
}
