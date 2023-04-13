import { ShipmentStatus } from "@/shared/types"

export const PARCEL_LIMIT = 20
export const PAGED_LIMIT = 20
export const READY_DATE_MIN_INTERVAL = 2 * 60 * 60 * 1000
export const DATE_CEIL_INTERVAL = 5 * 60 * 1000
export const MODAL_ANIMATION_DURATION = 200

export const PACKAGE_ID_DEFAULT = "1"
export const TOTAL_PACKAGES_NUMBER_DEFAULT = 1
export const PACKAGE_QUANTITY_DEFAULT = 1

export const DIMENSION_MIN = 1
export const DIMENSION_MAX = 99
export const DIMENSION_DEFAULT = 1
export const ENVELOPE_LENGTH_DEFAULT = 10
export const ENVELOPE_HEIGHT_DEFAULT = 15

export const PACKAGE_WEIGHT_MIN = 0.1
export const PACKAGE_WEIGHT_MAX = 99.9
export const PACKAGE_WEIGHT_DEFAULT = 1

export const PACKAGE_COST_MIN = 1
export const PACKAGE_COST_MAX = 999999
export const PACKAGE_COST_DEFAULT = 20
export const PACKAGE_CURRENCY_DEFAULT = "USD"

export const INITIAL_READY_DATE_DEFAULT = new Date().getTime() + READY_DATE_MIN_INTERVAL
export const READY_DATE_DEFAULT = new Date(
  Math.ceil(INITIAL_READY_DATE_DEFAULT / DATE_CEIL_INTERVAL) * DATE_CEIL_INTERVAL,
)

export const SHIPMENT_STATUSES = [
  ShipmentStatus.DRAFT,
  ShipmentStatus.SUBMIT_READY,
  ShipmentStatus.SUBMITTED,
  ShipmentStatus.IN_TRANSIT,
  ShipmentStatus.DELIVERED,
  ShipmentStatus.IN_RETURN,
  ShipmentStatus.RETURNED,
]

export const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus).filter(
  (status) => SHIPMENT_STATUSES.includes(status),
)
