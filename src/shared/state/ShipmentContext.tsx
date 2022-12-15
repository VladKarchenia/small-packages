import React, { createContext, useContext, useState } from "react"
import { DATE_CEIL_INTERVAL } from "@/constants"

export enum PickupType {
  Schedule = "Schedule a pickup",
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
  address2?: string
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
  date: Date
  rate: IRate
}

const initialShipmentState: ShipmentState = {
  sender: {
    // name: "",
    name: "Vlad Karch",
    // phone: "",
    phone: "+111111111111",
    extension: "",
    // email: "",
    email: "blabla@gmail.com",
    company: "",
    fullAddress: {
      // location: "",
      location: "USA, New York",
      country: "USA",
      // zipCode: "",
      zipCode: "12345",
      // state: "",
      state: "State",
      // city: "",
      city: "City",
      // address1: "",
      address1: "Address 1",
      address2: "",
    },
  },
  recipient: {
    // name: "",
    name: "Natalia Zakh",
    // phone: "",
    phone: "+12222222222",
    extension: "",
    // email: "",
    email: "miamia@gmail.com",
    company: "",
    fullAddress: {
      // location: "",
      location: "USA, Los Angeles",
      country: "USA",
      // zipCode: "",
      zipCode: "67890",
      // state: "",
      state: "State",
      // city: "",
      city: "City",
      // address1: "",
      address1: "Address 2",
      address2: "",
      isResidential: false,
    },
  },
  parcels: [
    {
      pickupType: PickupType.Schedule,
      weight: "1.0",
      dimensions: {
        length: "1",
        width: "1",
        height: "1",
      },
      packageType: PackageType.Own,
      content: ParcelContentType.Gift,
      totalPrice: "20.00",
      totalCurrency: "USD",
    },
    {
      pickupType: PickupType.Schedule,
      weight: "1.25",
      dimensions: {
        length: "0.8",
        width: "1.1",
        height: "0.75",
      },
      packageType: PackageType.Own,
      content: ParcelContentType.Gift,
      totalPrice: "12.00",
      totalCurrency: "USD",
    },
    {
      pickupType: PickupType.Schedule,
      weight: "1.33",
      dimensions: {
        length: "1.3",
        width: "1.2",
        height: "1",
      },
      packageType: PackageType.Own,
      content: ParcelContentType.Documents,
      totalPrice: "120.00",
      totalCurrency: "USD",
    },
  ],
  // date: null,
  // date: new Date(),
  date: new Date(Math.ceil(new Date().getTime() / DATE_CEIL_INTERVAL) * DATE_CEIL_INTERVAL),
  rate: {
    rateType: "",
    name: "",
    // name: "UPS, Delivery",
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
