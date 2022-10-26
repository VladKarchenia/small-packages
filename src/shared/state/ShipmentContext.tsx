import React, { createContext, useContext, useReducer } from "react"

export interface IStep {
  name: string
  completed: boolean
  disabled: boolean
}

type State = {
  info: IStep
  shipment: IStep
  summary: IStep
  confirmation: IStep
}

type Action = {
  type: string
  payload: IStep
}

type Dispatch = (action: Action) => void

const initialState: State = {
  info: {
    name: "info",
    completed: false,
    disabled: false,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
  },
  summary: {
    name: "summary",
    completed: false,
    disabled: true,
  },
  confirmation: {
    name: "confirmation",
    completed: false,
    disabled: true,
  },
}

type ShipmentContextProviderProps = { children: React.ReactNode }

const ShipmentContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_STEP_DATA": {
      return {
        ...state,
        [action.payload.name]: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const ShipmentContextProvider = ({ children }: ShipmentContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const value = { state, dispatch }

  return <ShipmentContext.Provider value={value}>{children}</ShipmentContext.Provider>
}

const useShipmentContext = () => {
  const context = useContext(ShipmentContext)

  return context
}

export { ShipmentContextProvider, useShipmentContext }
