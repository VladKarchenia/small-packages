import axios from "axios"
import { ORGANIZATION_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"
import { IOrganizationResponse, IOrganizationsResponse } from "./types"

export const organizationApi = axios.create({
  baseURL: ORGANIZATION_BASE_URI,
})

organizationApi.defaults.headers.common["Content-Type"] = "application/json"

// TODO: this is query
export const getAllOrganizationsFn = async (page = 0, size = 20) => {
  const response = await organizationApi.get<IOrganizationsResponse>(
    `organizations/all?page=${page}&size=${size}`,
  )

  return response.data.content
}

export const getOrganizationByIdFn = async ({ id }: { id: number }) => {
  const response = await organizationApi.get<IOrganizationResponse>(`organizations/${id}`)

  return response.data
}

organizationApi.interceptors.response.use(
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

        return organizationApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
