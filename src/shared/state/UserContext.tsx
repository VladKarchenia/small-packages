import React, { createContext, useContext, useState } from "react"
import { IUser } from "@/api/types"

export interface UserState {
  authUser: IUser
}

const initialUserState: UserState = {
  authUser: {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    authorities: [],
    organizationIds: [],
  },
}

type UserAction = ({ authUser }: UserState) => void

export const UserStateContext = createContext<UserState>({} as UserState)
UserStateContext.displayName = "UserStateContext"

export const UserActionContext = createContext<UserAction>({} as UserAction)
UserActionContext.displayName = "UserActionContext"

export const useUserStateContext = () => useContext(UserStateContext)

export const useUserActionContext = () => useContext(UserActionContext)

type StateContextProviderProps = { children: React.ReactNode }

export const UserProvider = ({ children }: StateContextProviderProps) => {
  const [state, setState] = useState<UserState>(initialUserState)

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider value={setState}>{children}</UserActionContext.Provider>
    </UserStateContext.Provider>
  )
}
