import { ShipmentStatus } from "@/shared/types"

import { Copy } from "@/shared/components"

import { STrackerLabel } from "./StatusLabel.styles"

export const StatusLabel = ({ status }: { status: ShipmentStatus | null }) => {
  if (!status) return null

  return (
    <STrackerLabel>
      <Copy color="neutrals-0">{status}</Copy>
    </STrackerLabel>
  )
}
