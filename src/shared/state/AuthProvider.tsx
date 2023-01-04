import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { userApi, getMeFn } from "@/api/userApi"
import { useUserActionContext } from "@/shared/state"
import { FullScreenLoader } from "@/pages"
import { shipmentApi } from "@/api/shipmentApi"
import { placeApi } from "@/api/placeApi"

type AuthProviderProps = {
  children: React.ReactElement
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // TODO: use Zustand
  const accessToken = window.localStorage.getItem("accessToken") || ""
  const username = window.localStorage.getItem("username") || ""
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const setUserContext = useUserActionContext()

  const { isLoading, isFetching, refetch } = useQuery(["authUser"], () => getMeFn(username), {
    enabled: false,
    onSuccess: (data) => {
      setUserContext({ authUser: data })
    },
  })

  useEffect(() => {
    if (accessToken) {
      if (!userApi.defaults.headers.common["Authorization"]) {
        userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }
      if (!shipmentApi.defaults.headers.common["Authorization"]) {
        shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }
      if (!placeApi.defaults.headers.common["Authorization"]) {
        placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      }
    }
  }, [accessToken])

  useEffect(() => {
    if (username && Object.keys(user).length === 0) {
      refetch()
    }
  }, [username, user, refetch])

  if (isLoading || isFetching) {
    return <FullScreenLoader />
  }

  return children
}
