import axios from "axios"
import { PLACE_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"
import { ISearchCitiesByZipResponse, ISearchPlacesResponse } from "./types"

export const placeApi = axios.create({
  baseURL: PLACE_BASE_URI,
})

placeApi.defaults.headers.common["Content-Type"] = "application/json"

// TODO: this is query? with enabled condition?
export const searchPlacesFn = async ({
  country,
  field = "displayName",
  keyword,
  page = 0,
  size = 20,
}: {
  country: string
  field?: string
  keyword: string
  page?: number
  size?: number
}) => {
  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const response = await placeApi.get<ISearchPlacesResponse>(
    `places/search?country=${country}&field=${field}&keyword=${keyword}&organizationId=${organization?.id}&page=${page}&size=${size}`,
  )

  return response.data
}

// TODO: this is query with enabled condition
export const searchCitiesByZipFn = async ({
  country,
  zipCode,
}: {
  country: string
  zipCode: string
}) => {
  const response = await placeApi.get<ISearchCitiesByZipResponse>(
    `places/citiesByZip?country=${country}&zipCode=${zipCode}`,
  )

  return response.data.data
}

placeApi.interceptors.response.use(
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

        return placeApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
