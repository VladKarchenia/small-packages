import axios from "axios"

import { PLACE_BASE_URI } from "@/constants"
import { ISearchCitiesByZipResponse, IPlacesResponse } from "./types"

export const placeApi = axios.create({
  baseURL: PLACE_BASE_URI,
})

placeApi.defaults.headers.common["Content-Type"] = "application/json"

export const searchPlacesFn = async ({
  country,
  keyword,
  page = 0,
  size = 100,
}: {
  country: string
  keyword: string
  page?: number
  size?: number
}) => {
  const { data } = await placeApi.get<IPlacesResponse>(
    `places/search?country=${country}&keyword=${keyword}&page=${page}&size=${size}`,
  )

  return data
}

export const searchAddressesFn = async ({
  country,
  zipCode,
  state,
  city,
  address,
  page = 0,
  size = 100,
}: {
  country: string
  zipCode: string
  state: string
  city: string
  address: string
  page?: number
  size?: number
}) => {
  const { data } = await placeApi.get<IPlacesResponse>(
    `places/search?country=${country}&zipcode=${zipCode}&state=${state}&city=${city}&address=${address}&page=${page}&size=${size}`,
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

  return data
}
