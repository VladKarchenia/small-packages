import React, { createContext, useContext, useState } from "react"

import { DATE_CEIL_INTERVAL } from "@/constants"
import {
  IGeolocation,
  IParcel,
  IPerson,
  IRate,
  PackageType,
  ParcelContentType,
  PickupType,
  ShipmentStatus,
} from "@/shared/types"
import { ShippingType } from "@/shipment"

export interface ShipmentState {
  sender: IPerson
  recipient: IPerson
  parcels: IParcel[]
  date: Date
  rate: IRate
  shippingType: ShippingType | null
  shipmentStatus: ShipmentStatus | null
  currentLocation: IGeolocation
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
      displayName: "",
      country: "United States",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      latitude: "",
      longitude: "",
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
      displayName: "",
      country: "United States",
      zipCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      latitude: "",
      longitude: "",
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
      packageType: PackageType.CUSTOM,
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
  currentLocation: {
    displayName: "",
    latitude: "",
    longitude: "",
  },
  shippingType: null,
  shipmentStatus: null,
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
