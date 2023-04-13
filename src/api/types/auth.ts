import { PackagingType, PickupType } from "@/shared/types"

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

export interface ChangePersonInfoInput {
  fullName: string
  phone: string
  username: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
  darkTheme: boolean
}

export interface ChangePersonPreferencesInput {
  readyTime: Date | null
  quoteExpirationDays: number
  packagingType: PackagingType
  declaredValue: number
  currency: string

  unitOfMeasure: string
  dimensionUnit: string
  weightUnit: string

  pickupType: PickupType

  organizationId: number | null
}
