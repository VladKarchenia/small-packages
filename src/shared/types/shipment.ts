export enum ShipmentStatus {
  DRAFT = "Draft",
  SUBMIT_READY = "Submit ready",
  SUBMITTED = "Submitted",
  IN_TRANSIT = "In transit",
  DELIVERED = "Delivered",
  IN_RETURN = "In return",
  RETURNED = "Returned",
  CANCELLED = "Cancelled",
  EXPIRED = "Expired",
  DELETED = "Deleted",

  QUOTE_QUOTED = "Quoted",
  QUOTE_CANCELLED = "Cancelled",
  QUOTE_EXPIRED = "Expired",
  QUOTE_DELETED = "Deleted",
}

export enum PickupType {
  Schedule = "Schedule a pickup",
}

export enum PackageType {
  Custom = "CUSTOM",
}

export enum PackagingType {
  OWN = "My packaging",
  ENVELOPE = "Envelope",
}

export enum ParcelContentType {
  Gift = "Gift",
  Company = "Data within my company",
  Selling = "Selling items",
  Documents = "Non commercial documents",
  Samples = "Product samples",
  Repair = "Items to be repaired",
  Return = "Items for return",
  Other = "Other",
}

interface IParcelDimensions {
  length: string
  width: string
  height: string
}

export enum IdenticalPackagesType {
  Identical = "true",
  Different = "false",
}

export interface IPackaging {
  pickupType: PickupType
  packagingType: PackagingType
  totalPackagesNumber: number
  packageContent: ParcelContentType
  identicalPackages: IdenticalPackagesType
}

export interface IParcel {
  weight: string
  dimensions: IParcelDimensions
  totalPrice: string
  totalCurrency: string
  packageId: string
  packageType: PackageType
  quantity: number
}

export interface IParcels {
  [key: string]: IParcel
}

export interface IGeolocation {
  displayName: string
  latitude: string
  longitude: string
}

export interface IRate {
  rateType: string
  name: string
  price: number
  currency: string
  id: string
}

export enum ResidentialType {
  Residential = "true",
  Nonresidential = "false",
}

export interface IAddress {
  displayName: string
  country: string
  zipCode: string
  state: string
  city: string
  address1: string
  address2?: string
  latitude: string
  longitude: string
  isResidential?: boolean
}

export interface IPerson {
  name: string
  phone: string
  extension?: string
  email: string
  company?: string
  fullAddress: IAddress
}

export interface ShipmentState {
  sender: IPerson
  senderReturn: IPerson
  recipient: IPerson
  packaging: IPackaging
  parcels: IParcels
  date: Date
  rate: IRate
  shipmentStatus: ShipmentStatus | null
  currentLocation: IGeolocation
  hasReturnAddress: boolean
}
