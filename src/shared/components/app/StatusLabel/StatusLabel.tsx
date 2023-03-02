import { ShipmentStatus } from "@/shared/types"

import { Copy } from "@/shared/components"

import { STrackerLabel } from "./StatusLabel.styles"

export const StatusLabel = ({ status }: { status: ShipmentStatus | null }) => {
  if (!status) return null

  return (
    <STrackerLabel>
      <Copy scale={{ "@initial": 11, "@md": 10, "@lg": 9 }} color="system-white">
        {status}
      </Copy>
    </STrackerLabel>
  )
}
