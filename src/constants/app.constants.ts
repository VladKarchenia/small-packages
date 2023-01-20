import { ShipmentStatus } from "@/shared/types"

export const PARCEL_LIMIT = 20
export const PAGED_LIMIT = 20
export const DATE_CEIL_INTERVAL = 5 * 60 * 1000
export const MODAL_ANIMATION_DURATION = 200

export const SHIPMENT_STATUSES = [
  ShipmentStatus.COMPLETED,
  ShipmentStatus.CONFIRMED,
  ShipmentStatus.DELIVERED,
  ShipmentStatus.DRAFT,
  ShipmentStatus.IN_DELIVERY,
  ShipmentStatus.SUBMIT_READY,
  ShipmentStatus.CANCELLED,
]

export const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus).filter(
  (status) => SHIPMENT_STATUSES.includes(status),
)
