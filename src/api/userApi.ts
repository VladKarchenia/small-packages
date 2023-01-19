import axios from "axios"
import { IUser, IUserOrganizationResponse } from "./types"
import { USER_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"

export const userApi = axios.create({
  baseURL: USER_BASE_URI,
})

userApi.defaults.headers.common["Content-Type"] = "application/json"

// TODO: this is query with enabled condition
export const getMeFn = async (username: string) => {
  const response = await userApi.get<IUser>(`users/info?username=${username}`)

  // TODO: use Zustand
  localStorage.setItem("user", JSON.stringify(response.data))

  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const id = organization?.id ? organization?.id : response.data.organizationIds[0]

  const responseList = await getUserOrganizationsFn()

  if (responseList.length > 0) {
    localStorage.setItem("organization", JSON.stringify(responseList.find((i) => i.id === id)))
  }

  return response.data
}

// TODO: this is query
export const getUserOrganizationsFn = async () => {
  const response = await userApi.get<IUserOrganizationResponse[]>("users/organizations")

  return response.data
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
      const refreshToken = localStorage.getItem("refreshToken") || ""
      originalRequest._retry = true

      if (refreshToken) {
        const { accessToken } = await refreshTokenFn(refreshToken)
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

        return userApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
