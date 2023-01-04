import axios from "axios"
import urljoin from "url-join"
import { ILoginResponse, IRefreshResponse, LoginInput } from "./types"
import { AUTH_BASE_URI } from "@/config"
import { userApi, getMeFn } from "./userApi"
import { shipmentApi } from "./shipmentApi"
import { placeApi } from "./placeApi"

export const authApi = axios.create({
  baseURL: urljoin(AUTH_BASE_URI, "api"),
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

export const loginUserFn = async ({ username, password }: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", { username, password })
  const { accessToken, refreshToken } = response.data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  // TODO: move it to the Zustand
  window.localStorage.setItem("accessToken", accessToken)
  window.localStorage.setItem("refreshToken", refreshToken)
  window.localStorage.setItem("username", username)

  await getMeFn(username)

  return response.data
}

export const logoutUserFn = async (token: string) => {
  const response = await authApi.post<unknown>("auth/logout", { token })

  delete userApi.defaults.headers.common["Authorization"]
  delete shipmentApi.defaults.headers.common["Authorization"]
  delete placeApi.defaults.headers.common["Authorization"]

  // TODO: use Zustand
  window.localStorage.setItem("accessToken", "")
  window.localStorage.setItem("refreshToken", "")
  window.localStorage.setItem("username", "")
  window.localStorage.setItem("user", "")

  return response.data
}

export const refreshTokenFn = async (token: string) => {
  const response = await authApi.post<IRefreshResponse>("auth/refresh", { token })
  const { accessToken, refreshToken } = response.data

  userApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  shipmentApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  placeApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

  // TODO: use Zustand
  window.localStorage.setItem("accessToken", accessToken)
  window.localStorage.setItem("refreshToken", refreshToken)

  return response.data
}

export const forgotPasswordFn = async (email: string) => {
  const response = await authApi.post<unknown>("auth/forgot_password", { email })

  return response.data
}

export const resetPasswordFn = async ({
  newPassword,
  token,
}: {
  newPassword: string
  token: string
}) => {
  const response = await authApi.post<unknown>("auth/reset_password", { newPassword, token })

  return response.data
}
