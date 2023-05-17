import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { IUser, IUserOrganization, IUserSettings } from "@/api/types"
import { defaultUserShipmentPreferencesValues } from "@/shared/utils"

type GeneralUnion = IUserSlice & IOrganizationSlice & IAuthenticationSlice & ISettingsSlice
export interface IUserSlice {
  user: IUser
  setUser: (user: IUser) => void
}
export const initialUserData = {
  id: null,
  phone: "",
  username: "",
  firstName: "",
  lastName: "",
  authorities: [],
  organizationIds: [],
  darkTheme: false,
}

export const initialOrganizationData = {
  description: "",
  name: "",
  label: "",
  id: null,
  parentId: null,
}

export const initialSettingsData = {
  accounts: [],
  userShipmentPreferences: defaultUserShipmentPreferencesValues,
}

export interface IOrganizationSlice {
  organization: IUserOrganization
  setOrganization: (organization: IUserOrganization) => void
}

export interface ISettingsSlice {
  settings: IUserSettings
  setSettings: (settings: IUserSettings) => void
}

export interface IAuthenticationSlice {
  accessToken: string
  refreshToken: string
  setTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void
  setAccessToken: (accessToken: string) => void
  setRefreshToken: (refreshToken: string) => void
}

const createUserSlice: StateCreator<GeneralUnion, [], [], IUserSlice> = (set) => ({
  user: initialUserData,
  setUser: (user) => set({ user }),
})

const createOrganizationSlice: StateCreator<GeneralUnion, [], [], IOrganizationSlice> = (set) => ({
  organization: initialOrganizationData,
  setOrganization: (organization) => set({ organization }),
})

const createSettingsSlice: StateCreator<GeneralUnion, [], [], ISettingsSlice> = (set) => ({
  settings: initialSettingsData,
  setSettings: (settings) => set({ settings }),
})

const createAuthenticationSlice: StateCreator<GeneralUnion, [], [], IAuthenticationSlice> = (
  set,
) => ({
  accessToken: "",
  refreshToken: "",
  setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
})

export const useAuthStore = create<GeneralUnion>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createOrganizationSlice(...a),
      ...createAuthenticationSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: "authStore",
    },
  ),
)
