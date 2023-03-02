import { useMutation } from "react-query"

import { resetPasswordFn } from "@/api/authApi"

export const useReset = () => {
  return useMutation((data: { newPassword: string; token: string }) => resetPasswordFn(data))
}
