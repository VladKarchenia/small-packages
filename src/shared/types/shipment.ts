export enum PickupType {
  Schedule = "Schedule a pickup",
}

export enum PackageType {
  CUSTOM = "My packaging",
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

export interface IParcel {
  // just UI feature
  pickupType: PickupType
  weight: string
  dimensions: IParcelDimensions
  packageType: PackageType
  // ????
  content: ParcelContentType
  totalPrice: string
  // just UI feature
  totalCurrency: string
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
