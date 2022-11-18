import { Copy } from "@/shared/components"
import { STrackerLabel } from "./StatusLabel.styles"
import { ShipmentStatus } from "@/shared/types"

export const StatusLabel = ({ status }: { status: ShipmentStatus }) => {
  return (
    <STrackerLabel>
      <Copy scale={12} color="system-white">
        {status}
      </Copy>
    </STrackerLabel>
  )
}
