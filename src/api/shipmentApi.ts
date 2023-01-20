import axios from "axios"
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
  baseURL: SHIPMENT_BASE_URI,
})

shipmentApi.defaults.headers.common["Content-Type"] = "application/json"

// TODO: this is mutation
export const createShipmentFn = async (data: ShipmentInput) => {
  const response = await shipmentApi.post<IShipmentResponse>("shipments", { ...data })

  return response.data
}

// TODO: no need???
// export const deleteShipmentFn = async (id: string) => {
//   const response = await shipmentApi.delete<unknown>(`shipments/${id}`)

//   return response.data
// }

// TODO: this is query with enabled
export const getShipmentByIdFn = async (shipmentId: string) => {
  const response = await shipmentApi.get<IShipmentResponse>(`shipments?id=${shipmentId}`)

  return response.data
}

// TODO: this is mutation
export const updateShipmentFn = async (id: string, data: ShipmentInput) => {
  const response = await shipmentApi.put<IShipmentResponse>(`shipments/${id}`, { ...data })

  return response.data
}
// TODO: this is mutation
export const updateShipmentStatusFn = async (id: string, status: string) => {
  const data = [{ op: "add", path: "/data/SHIPMENT_STATUS", value: status }]

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
  const response = await shipmentApi.patch<IShipmentResponse>(
    `shipments/${id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  return response.data
}

// TODO: this is query
export const getAllShipmentsFn = async ({
  filter,
  sort,
  page = 0,
  size = 100,
}: {
  filter: string
  sort: string
  page?: number
  size?: number
}) => {
  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const response = await shipmentApi.get<IShipmentsResponse>(
    `shipments/all?organizationId=${organization?.id}&filter=${filter}&sort=${sort}&page=${page}&size=${size}`,
  )

  return response.data
}

// TODO: this is query with enabled condition
export const searchShipmentsFn = async ({
  keyword,
  sort,
  page = 0,
  size = 20,
}: {
  keyword: string
  sort: string
  page: number
  size: number
}) => {
  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const response = await shipmentApi.get<IFoundShipmentsResponse>(
    `shipments/search?keyword=${keyword}&organizationId=${organization?.id}&sort=${sort}&page=${page}&size=${size}`,
  )

  return response.data
}

// TODO: this is query but under some conditions?
export const getShipmentsFieldValuesFn = async ({
  field,
  keyword,
  status,
  page = 0,
  size = 10,
}: {
  field: string
  keyword: string
  status: "QUOTE" | "SHIPMENT"
  page?: number
  size?: number
}) => {
  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const response = await shipmentApi.get<IShipmentsFieldValuesResponse>(
    `shipments/filter?organizationId=${organization?.id}&field=${field}&keyword=${keyword}&status=${status}&page=${page}&size=${size}`,
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
      const refreshToken = localStorage.getItem("refreshToken") || ""
      originalRequest._retry = true

      if (refreshToken) {
        const { accessToken } = await refreshTokenFn(refreshToken)
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

        return shipmentApi(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
