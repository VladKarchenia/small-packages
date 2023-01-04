import { PackageType, ShipmentStatus } from "@/shared/types"

export interface ShipmentPackageInput {
  DECLARED_VALUE_AMOUNT?: string
  DIMENSION: string
  PACKAGING: keyof typeof PackageType
  TRACKING_NUMBER?: string
  WEIGHT: number
}

export interface ShipmentGeolocation {
  DISPLAY_NAME: string
  LATITUDE: string
  LONGITUDE: string
}

export interface ShipmentInput {
  CONSIGNEE_ADDRESS1: string
  CONSIGNEE_ADDRESS2?: string
  CONSIGNEE_CITY: string
  CONSIGNEE_COMPANY?: string
  CONSIGNEE_CONTACT: string
  CONSIGNEE_COUNTRY: string
  CONSIGNEE_EMAIL: string
  CONSIGNEE_PHONE: string
  CONSIGNEE_PHONE_EXTENSION?: string
  CONSIGNEE_POSTALCODE: string
  CONSIGNEE_RESIDENTIAL: string
  CONSIGNEE_STATE: string
  CONSIGNEE_GEOLOC: ShipmentGeolocation

  ORIGIN_ADDRESS1: string
  ORIGIN_ADDRESS2?: string
  ORIGIN_CITY: string
  ORIGIN_COMPANY?: string
  ORIGIN_CONTACT: string
  ORIGIN_COUNTRY: string
  ORIGIN_EMAIL: string
  ORIGIN_PHONE: string
  ORIGIN_PHONE_EXTENSION?: string
  ORIGIN_POSTALCODE: string
  ORIGIN_STATE: string
  ORIGIN_GEOLOC: ShipmentGeolocation

  PACKAGE: ShipmentPackageInput[]

  CURRENT_GEOLOC: ShipmentGeolocation

  ORGANIZATION_ID: number
  PROSHIP_ID?: string
  SERVICE?: string
  SHIPMENT_STATUS: keyof typeof ShipmentStatus
  SHIPMENT_TRACKING_NUMBER?: string
}

export interface IShipmentResponse {
  createdAt: string
  createdBy: string
  data: ShipmentInput
  expired: boolean
  id: string
  updatedAt: string
  updatedBy: string
}

export interface IShipmentsSortResponse {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface IShipmentsPageableResponse {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: IShipmentsSortResponse
  unpaged: boolean
}

export interface IShipmentsResponse {
  content: IShipmentResponse[]
  empty?: boolean
  first: boolean
  hasContent?: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: IShipmentsPageableResponse
  size: number
  sort: IShipmentsSortResponse
  totalElements: number
  totalPages: number
}

export interface IFoundShipmentResponse {
  consignee_ADDRESS: string
  consignee_COMPANY: string
  consignee_CONTACT: string
  id: string
  origin_ADDRESS: string
  origin_COMPANY: string
  origin_CONTACT: string
  proship_ID: string
  tracking_NUMBER: string
}

export interface IFoundShipmentsResponse {
  content: IFoundShipmentResponse[]
  empty?: boolean
  first: boolean
  hasContent?: boolean
  last: boolean
  number: number
  numberOfElements: number
  // pageable: IShipmentsPageableResponse
  size: number
  // sort: IShipmentsSortResponse
  totalElements: number
  totalPages: number
}

export interface IShipmentsFieldValuesResponse {
  content: string[]
  empty?: boolean
  first: boolean
  hasContent?: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number
}
