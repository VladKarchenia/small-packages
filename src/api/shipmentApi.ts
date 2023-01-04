import axios from "axios"
import urljoin from "url-join"
import { SHIPMENT_BASE_URI } from "@/config"
import { refreshTokenFn } from "./authApi"
import {
  IFoundShipmentsResponse,
  IShipmentResponse,
  IShipmentsFieldValuesResponse,
  IShipmentsResponse,
  ShipmentInput,
} from "./types"

export const shipmentApi = axios.create({
  baseURL: urljoin(SHIPMENT_BASE_URI, "api"),
})

shipmentApi.defaults.headers.common["Content-Type"] = "application/json"

export const createShipmentFn = async (data: ShipmentInput) => {
  const response = await shipmentApi.post<IShipmentResponse>("shipments", { ...data })

  return response.data
}

// TODO: no need???
// export const deleteShipmentFn = async (id: string) => {
//   const response = await shipmentApi.delete<unknown>(`shipments/${id}`)

//   return response.data
// }

export const getShipmentByIdFn = async (shipmentId: string) => {
  const response = await shipmentApi.get<IShipmentResponse>(`shipments?id=${shipmentId}`)

  return response.data
}

export const updateShipmentFn = async (id: string, data: ShipmentInput) => {
  // TODO: add response type

  // maybe only add operation is needed
  // [
  //   { op: "replace", path: "/baz", value: "boo" },
  //   { op: "add", path: "/hello", value: ["world"] },
  //   { op: "remove", path: "/foo" },
  // ]

  // [{"op":"add", "path":"/data/CONSIGNEE_CONTACT", "value": "asf"}]

  // if we want to change packages array we need to pass all items with all fields
  // "data/rates"

  //   bad example
  //   [{
  //     "op":"add",
  //     "path":"/data/PACKAGE",
  //     "value":[
  //         {
  //         "TRACKING_NUMBER":"12ABDS33"
  //         }
  //         ]
  // }]
  const response = await shipmentApi.patch<unknown>(`shipments/${id}`, { ...data })

  return response.data
}

export const getAllShipmentsFn = async ({
  organizationId,
  filter,
  sort,
  page = 0,
  size = 100,
}: {
  organizationId: number
  filter: string
  sort: string
  page?: number
  size?: number
}) => {
  const response = await shipmentApi.get<IShipmentsResponse>(
    `shipments/all?organizationId=${organizationId}&filter=${filter}&sort=${sort}&page=${page}&size=${size}`,
  )

  return response.data
}

export const searchShipmentsFn = async ({
  keyword,
  organizationId,
  sort,
  page = 0,
  size = 20,
}: {
  keyword: string
  organizationId: number
  sort: string
  page: number
  size: number
}) => {
  const response = await shipmentApi.get<IFoundShipmentsResponse>(
    `shipments/search?keyword=${keyword}&organizationId=${organizationId}&sort=${sort}&page=${page}&size=${size}`,
  )

  return response.data
}

export const getShipmentsFieldValuesFn = async ({
  organizationId,
  field,
  status,
  page = 0,
  size = 10,
}: {
  organizationId: number
  field: string
  status: "QUOTE" | "SHIPMENT"
  page?: number
  size?: number
}) => {
  const response = await shipmentApi.get<IShipmentsFieldValuesResponse>(
    `shipments/filter?organizationId=${organizationId}&field=${field}&status=${status}&page=${page}&size=${size}`,
  )

  return response.data
}

shipmentApi.interceptors.response.use(
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
        return shipmentApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
