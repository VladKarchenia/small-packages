import axios from "axios"

import { USER_BASE_URI } from "@/constants"
import { IUser, IUserOrganization } from "./types"

export const userApi = axios.create({
  baseURL: USER_BASE_URI,
})

userApi.defaults.headers.common["Content-Type"] = "application/json"

export const getMeFn = async (username: string) => {
  const { data: user } = await userApi.get<IUser>(`users/info?username=${username}`)
  const organizations = await getUserOrganizationsFn()

  return { user, organizations }
}

export const getUserOrganizationsFn = async () => {
  const { data } = await userApi.get<IUserOrganization[]>("users/organizations")

  return data
}

export const updateUserPasswordFn = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) => {
  const { data } = await userApi.post("users/update_password", {
    oldPassword,
    newPassword,
  })

  return data
}
