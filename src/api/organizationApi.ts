import axios from "axios"

import { ORGANIZATION_BASE_URI } from "@/constants"
import { IOrganizationResponse, IOrganizationsResponse } from "./types"

export const organizationApi = axios.create({
  baseURL: ORGANIZATION_BASE_URI,
})

organizationApi.defaults.headers.common["Content-Type"] = "application/json"

export const getAllOrganizationsFn = async (page = 0, size = 1000) => {
  const { data } = await organizationApi.get<IOrganizationsResponse>(
    `organizations/all?page=${page}&size=${size}`,
  )

  return data.content
}

export const getOrganizationByIdFn = async ({ id }: { id: number }) => {
  const { data } = await organizationApi.get<IOrganizationResponse>(`organizations/${id}`)

  return data
}
