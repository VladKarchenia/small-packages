export enum ShipmentStatus {
  "Confirmed" = "Confirmed",
  "Draft" = "Draft",
  "Paid" = "Paid",
  "Booked" = "Booked",
  "PickedUp" = "Picked up",
  "InDelivery" = "In delivery",
  "Delivered" = "Delivered",
  "Cancelled" = "Cancelled",
}

export enum Role {
  "Admin" = "Admin",
  "User" = "User",
}

export interface ICost {
  name: string
  value: number
}