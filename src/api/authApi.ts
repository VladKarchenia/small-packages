import axios from "axios"
import { ILoginResponse, IRefreshResponse, LoginInput, RecoveryInput } from "./types"
import { AUTH_BASE_URI } from "@/constants"
import { userApi, getMeFn } from "./userApi"
import { shipmentApi } from "./shipmentApi"
import { placeApi } from "./placeApi"
import { organizationApi } from "./organizationApi"

export const authApi = axios.create({
  baseURL: AUTH_BASE_URI,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

export const loginUserFn = async ({ username, password }: LoginInput) => {
  const { data } = await authApi.post<ILoginResponse>("auth/login", { username, password })
  const { accessToken } = data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  organizationApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  const { user, organizations } = await getMeFn(username)

  return { ...data, user, organizations }
}

export const logoutUserFn = async (token: string) => {
  const { data } = await authApi.post<string>("auth/logout", { token })

  delete userApi.defaults.headers.common["Authorization"]
  delete shipmentApi.defaults.headers.common["Authorization"]
  delete placeApi.defaults.headers.common["Authorization"]
  delete organizationApi.defaults.headers.common["Authorization"]

  return data
}

export const refreshTokenFn = async (token: string) => {
  const { data } = await authApi.post<IRefreshResponse>("auth/refresh", { token })
  const { accessToken } = data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  organizationApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  return data
}

export const forgotPasswordFn = async ({ email }: RecoveryInput) => {
  const { data } = await authApi.post<string>("auth/forgot_password", { email })

  return data
}

export const resetPasswordFn = async ({
  newPassword,
  token,
}: {
  newPassword: string
  token: string
}) => {
  const { data } = await authApi.post<string>("auth/reset_password", { newPassword, token })

  return data
}
