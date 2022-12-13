import React, { createContext, useContext, useReducer } from "react"
import { IUser } from "@/api/types"
import { Role } from "@/shared/types"

type State = {
  authUser: IUser | null
}

type Action = {
  type: string
  payload: IUser | null
}

type Dispatch = (action: Action) => void

const initialState: State = {
  authUser: {
    name: "Admin",
    email: "admin@gmail.com",
    //role: Role.User,
    role: Role.Admin,
    _id: "23423543345",
    id: "345345345",
    createdAt: "18.11.2022",
    updatedAt: "18.11.2022",
    __v: 2,
  },
}

type UserProviderProps = { children: React.ReactNode }

const StateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

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

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const value = { state, dispatch }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useStateContext = () => {
  const context = useContext(StateContext)

  return context
}

export { UserProvider, useStateContext }
