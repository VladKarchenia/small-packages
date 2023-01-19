import React, { createContext, useContext, useMemo, useState } from "react"

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
  senderReturn: IPerson
  recipient: IPerson
  parcels: IParcel[]
  date: Date
  rate: IRate
  shippingType: ShippingType | null
  shipmentStatus: ShipmentStatus | null
  currentLocation: IGeolocation
  hasReturnAddress: boolean
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
  senderReturn: {
    name: "",
    phone: "",
    extension: "",
    email: "",
    company: "",
    fullAddress: {
      displayName: "",
      country: "",
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
  hasReturnAddress: false,
}

type ShipmentActions = {
  setShipmentData: (value: ShipmentState) => void
  setShippingType: (value: ShippingType) => void
}

export const ShipmentStateContext = createContext<ShipmentState>({} as ShipmentState)
ShipmentStateContext.displayName = "ShipmentStateContext"

export const ShipmentActionContext = createContext<ShipmentActions>({} as ShipmentActions)
ShipmentActionContext.displayName = "ShipmentActionContext"

export const useShipmentStateContext = () => useContext(ShipmentStateContext)

export const useShipmentActionContext = () => useContext(ShipmentActionContext)

type StateContextProviderProps = { children: React.ReactNode }

export const ShipmentProvider = ({ children }: StateContextProviderProps) => {
  const [state, setState] = useState<ShipmentState>(initialShipmentState)

  const actions = useMemo<ShipmentActions>(
    () => ({
      setShipmentData: (value) => {
        setState((prevState) => ({
          ...prevState,
          ...value,
        }))
      },
      setShippingType: (value) => {
        setState((prevState) => ({
          ...prevState,
          shippingType: value,
        }))
      },
    }),
    [state],
  )

  return (
    <ShipmentStateContext.Provider value={state}>
      <ShipmentActionContext.Provider value={actions}>{children}</ShipmentActionContext.Provider>
    </ShipmentStateContext.Provider>
  )
}
