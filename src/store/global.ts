import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { ShippingType } from "@/shared/types"

export interface ShipmentSlice {
  shippingType: ShippingType
  setShippingType: (shippingType: ShippingType) => void
}

export interface DashboardSlice {
  tab: ShippingType
  setTab: (shippingType: ShippingType) => void
}

const createShipmentSlice: StateCreator<ShipmentSlice & DashboardSlice, [], [], ShipmentSlice> = (
  set,
) => ({
  shippingType: ShippingType.Shipment,
  setShippingType: (shippingType) => set({ shippingType }),
})

const createDashboardSlice: StateCreator<ShipmentSlice & DashboardSlice, [], [], DashboardSlice> = (
  set,
) => ({
  tab: ShippingType.Shipment,
  setTab: (tab) => set({ tab }),
})

export const useBoundStore = create<ShipmentSlice & DashboardSlice>()(
  persist(
    (...a) => ({
      ...createShipmentSlice(...a),
      ...createDashboardSlice(...a),
    }),
    {
      name: "persistStore",
    },
  ),
)
