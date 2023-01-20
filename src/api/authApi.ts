import axios from "axios"
import { ILoginResponse, IRefreshResponse, LoginInput } from "./types"
import { AUTH_BASE_URI } from "@/config"
import { userApi, getMeFn } from "./userApi"
import { shipmentApi } from "./shipmentApi"
import { placeApi } from "./placeApi"
import { organizationApi } from "./organizationApi"

export const authApi = axios.create({
  baseURL: AUTH_BASE_URI,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

// TODO: this is mutation
export const loginUserFn = async ({ username, password }: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", { username, password })
  const { accessToken, refreshToken } = response.data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  organizationApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  // TODO: move it to the Zustand
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
  localStorage.setItem("username", username)

  await getMeFn(username)

  return response.data
}

// TODO: this is mutation
export const logoutUserFn = async () => {
  const token = localStorage.getItem("refreshToken") || ""
  const response = await authApi.post("auth/logout", { token })

  delete userApi.defaults.headers.common["Authorization"]
  delete shipmentApi.defaults.headers.common["Authorization"]
  delete placeApi.defaults.headers.common["Authorization"]
  delete organizationApi.defaults.headers.common["Authorization"]

  // TODO: use Zustand
  localStorage.setItem("accessToken", "")
  localStorage.setItem("refreshToken", "")
  localStorage.setItem("username", "")
  localStorage.setItem("user", "")
  localStorage.setItem("organization", "")

  return response.data
}

// TODO: this is mutation
export const refreshTokenFn = async (token: string) => {
  const response = await authApi.post<IRefreshResponse>("auth/refresh", { token })
  const { accessToken, refreshToken } = response.data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  organizationApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  // TODO: use Zustand
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)

  return response.data
}

// TODO: this is mutation
export const forgotPasswordFn = async (email: string) => {
  const response = await authApi.post("auth/forgot_password", { email })

  return response.data
}

// TODO: this is mutation
export const resetPasswordFn = async ({
  newPassword,
  token,
}: {
  newPassword: string
  token: string
}) => {
  const response = await authApi.post("auth/reset_password", { newPassword, token })

  return response.data
}
