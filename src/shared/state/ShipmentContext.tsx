import React, { createContext, useContext, useState } from "react"

export enum ParcelContentType {
  Gift = "Gift",
  Other = "Other",
}

export enum ParcelType {
  Own = "Own package",
  Product = "Product",
}

export interface IParcelDimensions {
  length: string
  width: string
  height: string
}

export interface IParcel {
  weight: string
  dimensions: IParcelDimensions
  parcelType: ParcelType
  content: ParcelContentType
  description: string
  totalPrice: string
  totalCurrency: string
}

export interface IRate {
  rateType: string
  name: string
  price: string
  currency: string
  id: string
}

export interface IAddress {
  location: string
  country: string
  postCode: string
  state: string
  city: string
  address: string
  isResidential: boolean
}

export interface IPerson {
  name: string
  phone: string
  extension?: string
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
    company: "",
    fullAddress: {
      location: "",
      country: "USA",
      postCode: "",
      state: "",
      city: "",
      address: "",
      isResidential: false,
    },
  },
  recipient: {
    name: "",
    phone: "",
    extension: "",
    company: "",
    fullAddress: {
      location: "",
      country: "USA",
      postCode: "",
      state: "",
      city: "",
      address: "",
      isResidential: false,
    },
  },
  parcels: [
    {
      weight: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      parcelType: ParcelType.Own,
      content: ParcelContentType.Gift,
      description: "",
      totalPrice: "",
      totalCurrency: "USD",
    },
  ],
  date: null,
  rate: {
    rateType: "",
    name: "",
    price: "",
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
