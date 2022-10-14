import React from "react"
import { IUser } from "@/api/types"

type State = {
  authUser: IUser | null
}

type Action = {
  type: string
  payload: IUser | null
}

type Dispatch = (action: Action) => void

const initialState: State = {
  // authUser: null,
  authUser: {
    name: "Vlad",
    email: "vlad@mail.com",
    role: "admin",
    _id: "aaa",
    id: "aaa",
    createdAt: "15-01-2020",
    updatedAt: "16-01-2020",
    __v: 123,
  },
}

type StateContextProviderProps = { children: React.ReactNode }

const StateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        authUser: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const value = { state, dispatch }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useStateContext = () => {
  const context = React.useContext(StateContext)

  return context
}

export { StateContextProvider, useStateContext }
