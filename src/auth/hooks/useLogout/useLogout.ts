import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { shallow } from "zustand/shallow"
import { useTheme } from "next-themes"

import {
  initialOrganizationData,
  initialSettingsData,
  initialUserData,
  useAuthStore,
} from "@/store"
import { logoutUserFn } from "@/api/authApi"
import { LOGIN } from "@/constants"
import { showToast } from "@/shared/utils"

export const useLogout = () => {
  const navigate = useNavigate()
  const [refreshToken, setTokens, setUser, setSettings, setOrganization] = useAuthStore(
    (state) => [
      state.refreshToken,
      state.setTokens,
      state.setUser,
      state.setSettings,
      state.setOrganization,
    ],
    shallow,
  )
  const { setTheme } = useTheme()

  return useMutation(() => logoutUserFn(refreshToken), {
    onSuccess: () => {
      setTokens({ accessToken: "", refreshToken: "" })
      setUser(initialUserData)
      setOrganization(initialOrganizationData)
      setSettings(initialSettingsData)
      setTheme("light")

      navigate(LOGIN)
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
      }
    },
  })
}
