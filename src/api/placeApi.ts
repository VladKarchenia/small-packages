import axios from "axios"
import urljoin from "url-join"
import { PLACE_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"
import { ISearchCitiesByZipResponse, ISearchPlacesResponse } from "./types"

export const placeApi = axios.create({
  baseURL: urljoin(PLACE_BASE_URI, "api"),
})

placeApi.defaults.headers.common["Content-Type"] = "application/json"

export const searchPlacesFn = async ({
  country,
  field = "displayName",
  keyword,
  organizationId,
  page = 0,
  size = 20,
}: {
  country: string
  field?: string
  keyword: string
  organizationId: number
  page?: number
  size?: number
  // codes?: string
}) => {
  const response = await placeApi.get<ISearchPlacesResponse>(
    `places/search?country=${country}&field=${field}&keyword=${keyword}&organizationId=${organizationId}&page=${page}&size=${size}`,
  )

  return response.data
}

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
      const refreshToken = window.localStorage.getItem("refreshToken") || ""
      originalRequest._retry = true

      if (refreshToken) {
        await refreshTokenFn(refreshToken)
        return placeApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
