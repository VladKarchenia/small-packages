import { Copy } from "@/shared/components"
import { STrackerLabel } from "./StatusLabel.styles"
import { SHIPMENT_STATUSES } from "@/shared/types"

export const StatusLabel = ({status}:{status: SHIPMENT_STATUSES}) => {
  return(
    <STrackerLabel>
      <Copy scale={10} color="neutrals-0">{status}</Copy>
    </STrackerLabel>
  )
}
