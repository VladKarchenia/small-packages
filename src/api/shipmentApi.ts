import axios from "axios"

import { SHIPMENT_BASE_URI } from "@/constants"
import {
  IFoundShipmentsResponse,
  IShipmentResponse,
  IShipmentsFieldValuesResponse,
  IShipmentsResponse,
  IUserOrganization,
  ShipmentInput,
} from "./types"

export const shipmentApi = axios.create({
  baseURL: SHIPMENT_BASE_URI,
})

shipmentApi.defaults.headers.common["Content-Type"] = "application/json"

export const createShipmentFn = async (input: ShipmentInput) => {
  const { data } = await shipmentApi.post<IShipmentResponse>("shipments", { ...input })

  return data
}

export const getShipmentByIdFn = async (shipmentId: string) => {
  const { data } = await shipmentApi.get<IShipmentResponse>(`shipments?id=${shipmentId}`)

  return data
}

export const updateShipmentFn = async (id: string, input: ShipmentInput) => {
  const { data } = await shipmentApi.put<IShipmentResponse>(`shipments/${id}`, { ...input })

  return data
}

export const updateShipmentStatusFn = async (id: string, status: string) => {
  const input = [{ op: "add", path: "/data/SHIPMENT_STATUS", value: status }]

  const { data } = await shipmentApi.patch<IShipmentResponse>(
    `shipments/${id}`,
    JSON.stringify(input),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  return data
}

export const getAllShipmentsFn = async ({
  filter,
  sort,
  organization,
  page = 0,
  size = 1000,
}: {
  filter: string
  sort: string
  organization: IUserOrganization | null
  page?: number
  size?: number
}) => {
  const { data } = await shipmentApi.get<IShipmentsResponse>(
    `shipments/all?organizationId=${organization?.id}&filter=${filter}&sort=${sort}&page=${page}&size=${size}`,
  )

  return data.content
}

export const searchShipmentsFn = async ({
  keyword,
  sort = "createdAt,asc",
  organization,
  page = 0,
  size = 1000,
}: {
  keyword: string
  sort?: string
  organization: IUserOrganization | null
  page?: number
  size?: number
}) => {
  const { data } = await shipmentApi.get<IFoundShipmentsResponse>(
    `shipments/search?keyword=${keyword}&organizationId=${organization?.id}&sort=${sort}&page=${page}&size=${size}`,
  )

  return data.content
}

export const getShipmentsFieldValuesFn = async ({
  field,
  keyword,
  status,
  organization,
  page = 0,
  size = 1000,
}: {
  field: string
  keyword: string
  status: "QUOTE" | "SHIPMENT"
  organization: IUserOrganization | null
  page?: number
  size?: number
}) => {
  const { data } = await shipmentApi.get<IShipmentsFieldValuesResponse>(
    `shipments/filter?organizationId=${organization?.id}&field=${field}&keyword=${keyword}&status=${status}&page=${page}&size=${size}`,
  )

  return data.content
}
