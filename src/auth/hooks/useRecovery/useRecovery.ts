import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

import { forgotPasswordFn } from "@/api/authApi"
import { RecoveryInput } from "@/api/types"
import { LOGIN } from "@/constants"
import { showToast } from "@/shared/utils"

export const useRecovery = () => {
  const navigate = useNavigate()

  return useMutation((data: RecoveryInput) => forgotPasswordFn(data), {
    onSuccess: () => {
      navigate(LOGIN)
      showToast({ type: "info", text: "Please check your email for further instructions" })
    },
  })
}
