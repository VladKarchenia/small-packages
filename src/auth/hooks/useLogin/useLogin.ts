import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { shallow } from "zustand/shallow"
import { useTheme } from "next-themes"

import { useAuthStore } from "@/store"
import { loginUserFn } from "@/api/authApi"
import { LoginInput } from "@/api/types"
import { HOME } from "@/constants"
import { getDefaultUserOrganization } from "@/shared/utils"

export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state?.from.pathname as string) || HOME
  const [setTokens, setUser, setOrganization, setSettings] = useAuthStore(
    (state) => [state.setTokens, state.setUser, state.setOrganization, state.setSettings],
    shallow,
  )
  const { setTheme } = useTheme()

  return useMutation((data: LoginInput) => loginUserFn(data), {
    onSuccess: (data) => {
      const { accessToken, refreshToken, user, organizations, settings } = data

      const defaultOrganization = getDefaultUserOrganization(organizations, user)

      setTokens({ accessToken, refreshToken })
      setUser(user)

      setTheme(user.darkTheme ? "dark" : "light")
      defaultOrganization && setOrganization(defaultOrganization)
      settings && setSettings(settings)

      navigate(from)
    },
  })
}
