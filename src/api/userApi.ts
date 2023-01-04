import axios from "axios"
import urljoin from "url-join"
import { IUser } from "./types"
import { USER_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"

export const userApi = axios.create({
  baseURL: urljoin(USER_BASE_URI, "api"),
})

userApi.defaults.headers.common["Content-Type"] = "application/json"

export const getMeFn = async (username: string) => {
  const response = await userApi.get<IUser>(`users/info?username=${username}`)
  const formattedData = {
    ...response.data,
    activeOrganizationId: response.data.organizationIds[0],
  }

  // TODO: use Zustand
  window.localStorage.setItem("user", JSON.stringify(formattedData))

  return formattedData
}

userApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.error as string

    if (errMessage.includes("Unauthorized") && !originalRequest._retry) {
      // TODO: use Zustand
      const refreshToken = window.localStorage.getItem("refreshToken") || ""
      originalRequest._retry = true

      if (refreshToken) {
        await refreshTokenFn(refreshToken)
        return userApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
