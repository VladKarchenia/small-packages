import axios from "axios"

import { getDefaultUserOrganization, replaceFalsyProps } from "@/shared/utils"
import { USER_BASE_URI } from "@/constants"

import { IUser, IUserOrganization, IUserSettings } from "./types"
import { PackagingType, PickupType } from "@/shared/types"

export const userApi = axios.create({
  baseURL: USER_BASE_URI,
})

userApi.defaults.headers.common["Content-Type"] = "application/json"

export const getMeFn = async (username: string) => {
  const { data: user } = await userApi.get<IUser>(`users/info?username=${username}`)
  const organizations = await getUserOrganizationsFn()
  const defaultOrganization = getDefaultUserOrganization(organizations, user)
  const settings = defaultOrganization && (await getUserSettingsFn(defaultOrganization.id))

  return { user, organizations, settings }
}

export const getUserOrganizationsFn = async () => {
  const { data } = await userApi.get<IUserOrganization[]>("users/organizations")

  return data
}

export const getUserSettingsFn = async (organizationId: number | null) => {
  const { data } = await userApi.get<IUserSettings>(
    `users/settings?organizationId=${organizationId}`,
  )

  return data
}

export const updatePersonInfoFn = async ({
  phone,
  darkTheme,
  oldPassword,
  newPassword,
}: {
  phone: string
  darkTheme: boolean
  oldPassword: string
  newPassword: string
}) => {
  const formattedData = JSON.stringify(
    {
      phone,
      darkTheme,
      oldPassword,
      newPassword,
    },
    replaceFalsyProps,
  )

  const { data } = await userApi.post("users/update_profile", JSON.parse(formattedData))

  return data
}

export const updatePersonPreferencesFn = async ({
  readyTime,
  quoteExpirationDays,
  packagingType,
  declaredValue,
  currency,
  dimensionUnit,
  weightUnit,
  pickupType,
  organizationId,
}: {
  readyTime: string | null
  quoteExpirationDays: number
  packagingType: PackagingType
  declaredValue: number
  currency: string
  dimensionUnit: string
  weightUnit: string
  pickupType: keyof typeof PickupType
  organizationId: number | null
}) => {
  const formattedData = JSON.stringify(
    {
      readyTime,
      quoteExpirationDays,
      packagingType,
      declaredValue,
      currency,
      dimensionUnit,
      weightUnit,
      pickupType,
      organizationId,
    },
    replaceFalsyProps,
  )

  const { data } = await userApi.post("users/user-preference", JSON.parse(formattedData))

  return data
}

export const updatePersonAccountsFn = async ({
  accountId,
  organizationId,
}: {
  accountId: number | null
  organizationId: number | null
}) => {
  const { data } = await userApi.post("users/user-account-preference", {
    accountId,
    organizationId,
  })

  return data
}
