import React, { createContext, useContext, useMemo, useState } from "react"
import { PAGED_LIMIT } from "@/constants"
import { ShipmentStatus } from "@/shared/types"
import { IAddress } from "@/shared/state"

export enum ShipmentsPagedOrderBy {
  CreationDateAsc = "Creation date (ASC)",
  CreationDateDesc = "Creation date (DESC)",
  RecipientNameAsc = "Recipient name (A-Z)",
  RecipientNameDesc = "Recipient name (Z-A)",
  IdAsc = "ID (ASC)",
  IdDesc = "ID (DESC)",
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface DashboardState {
  limit: number
  offset: number
  searchTerm: string
  sortOrder: ShipmentsPagedOrderBy
  direction?: SortDirection
  status?: ShipmentStatus[] | null
  recipientName?: string | null
  originalAddress?: IAddress | null
  destinationAddress?: IAddress | null
}

const initialDashboardState: DashboardState = {
  limit: PAGED_LIMIT,
  offset: 0,
  searchTerm: "",
  sortOrder: ShipmentsPagedOrderBy.CreationDateAsc,
  direction: SortDirection.ASC,
  // status: null,
  status: [ShipmentStatus.Cancelled, ShipmentStatus.Draft],
  // recipientName: null,
  recipientName: "James Bond",
  // originalAddress: null,
  originalAddress: {
    location: "USA, New York",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
  // destinationAddress: null,
  destinationAddress: {
    location: "USA, New York",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    isResidential: false,
  },
}

type DashboardActions = {
  resetFilterField: (field: keyof DashboardState) => void
  setSearchTerm: (value: string) => void
  setSortOrder: (value: ShipmentsPagedOrderBy) => void
  setStatusFilter: (array: ShipmentStatus[] | null) => void
  setRecipientNameFilter: (value: string) => void
  setOriginalAddressFilter: (value: IAddress) => void
  setDestinationAddressFilter: (value: IAddress) => void
}

export const DashboardStateContext = createContext<DashboardState>({} as DashboardState)
DashboardStateContext.displayName = "DashboardStateContext"

export const DashboardActionContext = createContext<DashboardActions>({} as DashboardActions)
DashboardActionContext.displayName = "DashboardActionContext"

export const useDashboardStateContext = () => useContext(DashboardStateContext)

export const useDashboardActionContext = () => useContext(DashboardActionContext)

type StateContextProviderProps = { children: React.ReactNode }

export const DashboardProvider = ({ children }: StateContextProviderProps) => {
  const [state, setState] = useState<DashboardState>(initialDashboardState)

  const actions = useMemo<DashboardActions>(
    () => ({
      resetFilterField: (field) => {
        setState((prevState) => ({
          ...prevState,
          [field]: null,
        }))
      },
      setSearchTerm: (value) => {
        setState((prevState) => ({
          ...prevState,
          searchTerm: value,
        }))
      },
      setSortOrder: (value) => {
        setState((prevState) => ({
          ...prevState,
          sortOrder: value,
        }))
      },
      setStatusFilter: (array) => {
        setState((prevState) => ({
          ...prevState,
          status: array,
        }))
      },
      setRecipientNameFilter: (value) => {
        setState((prevState) => ({
          ...prevState,
          recipientName: value,
        }))
      },
      setOriginalAddressFilter: (value) => {
        setState((prevState) => ({
          ...prevState,
          originalAddress: value,
        }))
      },
      setDestinationAddressFilter: (value) => {
        setState((prevState) => ({
          ...prevState,
          destinationAddress: value,
        }))
      },
    }),
    [state],
  )
  return (
    <DashboardStateContext.Provider value={state}>
      <DashboardActionContext.Provider value={actions}>{children}</DashboardActionContext.Provider>
    </DashboardStateContext.Provider>
  )
}
