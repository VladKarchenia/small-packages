import React, { createContext, useContext, useState } from "react"

export enum ParcelDocumentType {
  Correspondence = "correspondence",
  Personal = "personal",
  Interoffice = "interoffice",
  Business = "business",
  Other = "other",
}

export enum ParcelType {
  Documents = "documents",
  Products = "products",
}

export interface IParcelDimensions {
  length: string
  width: string
  height: string
}

export interface IParcel {
  weight: string
  dimensions: IParcelDimensions
  type: ParcelType
  documentType: ParcelDocumentType
  description: string
  totalPrice: string
  totalCurrency: string
}

export interface IRate {
  type: string
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

type ShipmentState = {
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
      type: ParcelType.Products,
      documentType: ParcelDocumentType.Correspondence,
      description: "",
      totalPrice: "",
      totalCurrency: "USD",
    },
  ],
  date: null,
  rate: {
    type: "",
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
