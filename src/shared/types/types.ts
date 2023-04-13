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

export enum ShippingType {
  Quote = "quote",
  Shipment = "shipment",
}

export enum SettingType {
  GeneralInfo = "generalInfo",
  Preferences = "preferences",
  Addresses = "addresses",
  Accounts = "accounts",
}
