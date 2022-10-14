import React from "react"
import { useCookies } from "react-cookie"
import { useQuery } from "react-query"
import { getMe } from "@/api/authApi"
import { useStateContext } from "@/shared/state"
import { FullScreenLoader } from "@/pages"

type AuthProviderProps = {
  children: React.ReactElement
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"])
  const stateContext = useStateContext()

  const query = useQuery(["authUser"], () => getMe(), {
    enabled: !!cookies.logged_in,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext?.dispatch({ type: "SET_USER", payload: data })
    },
  })

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />
  }

  return children
}
