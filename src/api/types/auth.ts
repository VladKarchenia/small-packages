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
  // need to fix this, move to the contextType, Admin is able to choose this ID, User have only 1 id in the array
  organizationIds: number[]
  // TODO: fix activeOrganizationId to make it required
  activeOrganizationId: number
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  expiresInTime: number
}

export interface IRefreshResponse {
  accessToken: string
  refreshToken: string
  expiresInTime: number
}

export interface LoginInput {
  username: string
  password: string
}

export interface RecoveryInput {
  email: string
}

export interface ResetInput {
  newPassword: string
  confirmNewPassword: string
}

export interface ChangeInput {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
