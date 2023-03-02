import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"

import { IUser, IUserOrganization } from "@/api/types"

export interface UserSlice {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export interface OrganizationSlice {
  organization: IUserOrganization | null
  setOrganization: (organization: IUserOrganization | null) => void
}

export interface AuthenticationSlice {
  accessToken: string
  refreshToken: string
  setTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void
  setAccessToken: (accessToken: string) => void
  setRefreshToken: (refreshToken: string) => void
}

const createUserSlice: StateCreator<
  UserSlice & OrganizationSlice & AuthenticationSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
})

const createOrganizationSlice: StateCreator<
  UserSlice & OrganizationSlice & AuthenticationSlice,
  [],
  [],
  OrganizationSlice
> = (set) => ({
  organization: null,
  setOrganization: (organization) => set({ organization }),
})

const createAuthenticationSlice: StateCreator<
  UserSlice & OrganizationSlice & AuthenticationSlice,
  [],
  [],
  AuthenticationSlice
> = (set) => ({
  accessToken: "",
  refreshToken: "",
  setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
})

export const useAuthStore = create<UserSlice & OrganizationSlice & AuthenticationSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createOrganizationSlice(...a),
      ...createAuthenticationSlice(...a),
    }),
    {
      name: "authStore",
    },
  ),
)
