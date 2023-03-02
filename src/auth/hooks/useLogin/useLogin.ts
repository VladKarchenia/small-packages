import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { loginUserFn } from "@/api/authApi"
import { LoginInput } from "@/api/types"
import { HOME } from "@/constants"

export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state?.from.pathname as string) || HOME
  const [setTokens, setUser, setOrganization] = useAuthStore(
    (state) => [state.setTokens, state.setUser, state.setOrganization],
    shallow,
  )

  return useMutation((data: LoginInput) => loginUserFn(data), {
    onSuccess: (data) => {
      const { accessToken, refreshToken, user, organizations } = data
      const defaultOrganization = organizations.find((i) => i.id === user.organizationIds[0])

      setTokens({ accessToken, refreshToken })
      setUser(user)
      defaultOrganization && setOrganization(defaultOrganization)

      navigate(from)
    },
  })
}
