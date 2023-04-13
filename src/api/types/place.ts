export interface IPlacesSortResponse {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface IPlacesPageableResponse {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: IPlacesSortResponse
  unpaged: boolean
}

export interface IPlaceResponse {
  address1: string
  address2: string
  city: string
  contactName: string
  country: string
  displayName: string
  email: string
  id: string
  latitude: string
  locationType: string
  longitude: string
  phone: string
  phoneExtension: string
  state: string
  zipCode: string
}

export interface IPlacesResponse {
  content: IPlaceResponse[]
  empty?: boolean
  first: boolean
  hasContent?: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: IPlacesPageableResponse
  size: number
  sort: IPlacesSortResponse
  totalElements: number
  totalPages: number
}

export interface ICitiesByZipResponse {
  state: string
  cities: string[]
  country: string
}

export enum ZipType {
  STANDARD = "STANDARD",
  UNIQUE = "UNIQUE",
  POBOX = "PO BOX",
  MILITARY = "MILITARY",
}

export interface ISearchCitiesByZipResponse {
  data: ICitiesByZipResponse[]
  latitude?: string
  longitude?: string
  zipType: ZipType
}
