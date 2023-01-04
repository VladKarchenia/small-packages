import { Copy } from "@/shared/components"
import { STrackerLabel } from "./StatusLabel.styles"
import { ShipmentStatus } from "@/shared/types"

export const StatusLabel = ({ status }: { status: ShipmentStatus | null }) => {
  if (!status) return null

  return (
    <STrackerLabel>
      <Copy scale={{ "@initial": 11, "@sm": 9 }} color="system-white">
        {status}
      </Copy>
    </STrackerLabel>
  )
}
