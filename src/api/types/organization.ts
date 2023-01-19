export interface IOrganizationResponse {
  description: string | null
  name: string | null
  id: number | null
  parentId: number | null
}

export interface IOrganizationsResponse {
  content: IOrganizationResponse[]
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
