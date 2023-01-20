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
  country: string
  displayName: string
  id: string
  latitude: string
  longitude: string
  organizationId: string
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

export interface ISearchPlacesResponse {
  first: IPlacesResponse
  second: IPlacesResponse
}

export interface ICitiesByZipResponse {
  state: string
  cities: string[]
}

export interface ISearchCitiesByZipResponse {
  data: ICitiesByZipResponse[]
}
