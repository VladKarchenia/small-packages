import axios from "axios"

import { PLACE_BASE_URI } from "@/constants"
import { ISearchCitiesByZipResponse, ISearchPlacesResponse, IUserOrganization } from "./types"

export const placeApi = axios.create({
  baseURL: PLACE_BASE_URI,
})

placeApi.defaults.headers.common["Content-Type"] = "application/json"

export const searchPlacesFn = async ({
  country,
  field = "displayName",
  keyword,
  organization,
  page = 0,
  size = 100,
}: {
  country: string
  field?: string
  keyword: string
  organization: IUserOrganization | null
  page?: number
  size?: number
}) => {
  const { data } = await placeApi.get<ISearchPlacesResponse>(
    `places/search?country=${country}&field=${field}&keyword=${keyword}&organizationId=${organization?.id}&page=${page}&size=${size}`,
  )

  return data
}

export const searchCitiesByZipFn = async ({
  country,
  zipCode,
}: {
  country: string
  zipCode: string
}) => {
  const { data } = await placeApi.get<ISearchCitiesByZipResponse>(
    `places/citiesByZip?country=${country}&zipCode=${zipCode}`,
  )

  return data.data
}
