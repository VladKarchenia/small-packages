import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { logoutUserFn } from "@/api/authApi"
import { LOGIN } from "@/constants"
import { showToast } from "@/shared/utils"

export const useLogout = () => {
  const navigate = useNavigate()
  const [refreshToken, setTokens, setUser, setOrganization] = useAuthStore(
    (state) => [state.refreshToken, state.setTokens, state.setUser, state.setOrganization],
    shallow,
  )

  return useMutation(() => logoutUserFn(refreshToken), {
    onSuccess: () => {
      setTokens({ accessToken: "", refreshToken: "" })
      setUser(null)
      setOrganization(null)

      navigate(LOGIN)
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
      }
    },
  })
}
