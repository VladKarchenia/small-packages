import React, { createContext, useContext, useMemo, useState } from "react"
import { PAGED_LIMIT } from "@/constants"
import { ShipmentStatus, IAddress } from "@/shared/types"

export enum ShipmentsPagedOrderBy {
  CreationDateAsc = "Creation date (ASC)",
  CreationDateDesc = "Creation date (DESC)",
  RecipientNameAsc = "Recipient name (A-Z)",
  RecipientNameDesc = "Recipient name (Z-A)",
  IdAsc = "ID (ASC)",
  IdDesc = "ID (DESC)",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface DashboardState {
  limit: number
  offset: number
  searchTerm: string
  sortOrder: ShipmentsPagedOrderBy
  direction: SortDirection
  status: ShipmentStatus[]
  recipientName: string[]
  originalAddress: string[]
  destinationAddress: string[]
}

const initialDashboardState: DashboardState = {
  limit: PAGED_LIMIT,
  offset: 0,
  searchTerm: "",
  sortOrder: ShipmentsPagedOrderBy.CreationDateAsc,
  direction: SortDirection.ASC,
  status: [],
  recipientName: [],
  originalAddress: [],
  destinationAddress: [],
}

type DashboardActions = {
  resetFilterField: (field: keyof DashboardState) => void
  setSearchTerm: (value: string) => void
  setSortOrder: (value: ShipmentsPagedOrderBy) => void
  setSortDirection: (value: SortDirection) => void
  setStatusFilter: (array: ShipmentStatus[]) => void
  setRecipientNameFilter: (value: string[]) => void
  setOriginalAddressFilter: (value: string[]) => void
  setDestinationAddressFilter: (value: string[]) => void
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
          [field]: [],
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
      setSortDirection: (value) => {
        setState((prevState) => ({
          ...prevState,
          direction: value,
        }))
      },
      setStatusFilter: (array) => {
        setState((prevState) => ({
          ...prevState,
          status: array,
        }))
      },
      setRecipientNameFilter: (array) => {
        setState((prevState) => ({
          ...prevState,
          recipientName: array,
        }))
      },
      setOriginalAddressFilter: (array) => {
        setState((prevState) => ({
          ...prevState,
          originalAddress: array,
        }))
      },
      setDestinationAddressFilter: (array) => {
        setState((prevState) => ({
          ...prevState,
          destinationAddress: array,
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
