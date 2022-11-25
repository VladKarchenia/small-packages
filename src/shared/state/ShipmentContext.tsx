import React, { createContext, useContext, useState } from "react"

export enum PickupType {
  Schedule = "Schedule a pickup",
}
export enum ParcelContentType {
  Gift = "Gift",
  Company = "Data within my company",
  Selling = "Selling items",
  Documents = "Documents of no commercial value",
  Samples = "Product samples",
  Repair = "Items to be repaired",
  Return = "Items for return",
  Other = "Other",
}

export enum PackageType {
  Own = "Own package",
}

export interface IParcelDimensions {
  length: string
  width: string
  height: string
}

export interface IParcel {
  pickupType: PickupType
  weight: string
  dimensions: IParcelDimensions
  packageType: PackageType
  content: ParcelContentType
  totalPrice: string
  totalCurrency: string
}

export interface IRate {
  rateType: string
  name: string
  price: number
  currency: string
  id: string
}

export interface IAddress {
  location: string
  country: string
  zipCode: string
  state: string
  city: string
  address1: string
  address2: string
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
  recipient: IPerson
  parcels: IParcel[]
  date: Date | null
  rate: IRate
}

const initialShipmentState: ShipmentState = {
  sender: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      // location: "",
      location: "USA, New York",
      country: "USA",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
    },
  },
  recipient: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      // location: "",
      location: "USA, Los Angeles",
      country: "USA",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      isResidential: false,
    },
  },
  parcels: [
    {
      pickupType: PickupType.Schedule,
      weight: "0.1",
      dimensions: {
        length: "1",
        width: "1",
        height: "1",
      },
      packageType: PackageType.Own,
      content: ParcelContentType.Gift,
      totalPrice: "0.1",
      totalCurrency: "USD",
    },
    {
      pickupType: PickupType.Schedule,
      weight: "0.2",
      dimensions: {
        length: "3",
        width: "3",
        height: "3",
      },
      packageType: PackageType.Own,
      content: ParcelContentType.Gift,
      totalPrice: "100",
      totalCurrency: "USD",
    },
  ],
  // date: null,
  date: new Date(),
  rate: {
    rateType: "",
    // name: "",
    name: "UPS, Delivery",
    // price: 0,
    price: 1520,
    currency: "",
    id: "",
  },
}

type ShipmentAction = ({ sender, recipient, parcels, date, rate }: ShipmentState) => void

export const ShipmentStateContext = createContext<ShipmentState>({} as ShipmentState)
ShipmentStateContext.displayName = "ShipmentStateContext"

export const ShipmentActionContext = createContext<ShipmentAction>({} as ShipmentAction)
ShipmentActionContext.displayName = "ShipmentActionContext"

export const useShipmentStateContext = () => useContext(ShipmentStateContext)

export const useShipmentActionContext = () => useContext(ShipmentActionContext)

type StateContextProviderProps = { children: React.ReactNode }

export const ShipmentProvider = ({ children }: StateContextProviderProps) => {
  const [state, setState] = useState<ShipmentState>(initialShipmentState)

  return (
    <ShipmentStateContext.Provider value={state}>
      <ShipmentActionContext.Provider value={setState}>{children}</ShipmentActionContext.Provider>
    </ShipmentStateContext.Provider>
  )
}
