export enum ShipmentStatus {
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
  CONFIRMED = "Confirmed",
  DELIVERED = "Delivered",
  DRAFT = "Draft",
  IN_DELIVERY = "In delivery",
  QUOTE = "Quote",
  SUBMIT_READY = "Submit ready",

  QUOTE_READY = "Ready quote",
  QUOTE_QUOTED = "Quoted quote",
  QUOTE_CANCELLED = "Cancelled quote",
  QUOTE_EXPIRED = "Expired quote",
  QUOTE_DELETED = "Deleted quote",
}

export enum Role {
  Admin = "ROLE_ADMIN",
  User = "ROLE_USER",
  Ops = "ROLE_OPS",
}

export interface ICost {
  name: string
  value: number
}

export interface RouteParams {
  shipmentId: string
}
