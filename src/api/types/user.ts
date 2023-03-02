import { Role } from "@/shared/types"

interface IAuthority {
  authority: Role
}

export interface IUser {
  id: number
  username: string
  firstName: string
  lastName: string
  authorities: IAuthority[]
  organizationIds: number[]
}

export interface IUserOrganization {
  description: string | null
  name: string | null
  label: string | null
  id: number | null
  parentId: number | null
}
