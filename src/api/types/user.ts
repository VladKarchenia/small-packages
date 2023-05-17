import { Carriers, PackagingType, PickupType, Role } from "@/shared/types"

interface IAuthority {
  authority: Role
}

export interface IUser {
  id: number | null
  phone: string
  username: string
  firstName: string
  lastName: string
  authorities: IAuthority[]
  organizationIds: number[]
  darkTheme: boolean
}

export interface IUserOrganization {
  description: string
  name: string
  label: string
  id: number | null
  parentId: number | null
}

export interface ISettingsAccount {
  carrier: Carriers
  id: number
  name: string
  default: boolean
}

export interface ISettingsUserAccountPreferences {
  accountId: number
  id: number
  organizationId: number
}

export interface ISettingsUserFilters {
  filter: string
  id: number
  name: string
  organizationId: number
}

export interface ISettingsUserShipmentPreferences {
  readyTime: string | null
  quoteExpirationDays: number
  packagingType: PackagingType
  declaredValue: number
  currency: string
  dimensionUnit: string
  weightUnit: string
  pickupType: keyof typeof PickupType
}

export interface ISettingsVisibilitySettings {
  addressIds: [number]
  id: number
  organizationIds: [number]
  type: string
  userIds: [number]
}

export interface IUserSettings {
  accounts: ISettingsAccount[]
  userShipmentPreferences: ISettingsUserShipmentPreferences
}

export interface ChangePersonAccountsInput {
  accounts: ISettingsAccount[]
  fedExName: string
  upsName: string
}
