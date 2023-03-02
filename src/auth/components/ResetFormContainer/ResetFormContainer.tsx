import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { Navigate, useLocation } from "react-router-dom"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { parseUrl } from "query-string"

import { useReset } from "@/auth/hooks"
import { ResetInput } from "@/api/types"
import { HOME } from "@/constants"

import { ResetForm } from "@/auth/components"

const defaultValues: ResetInput = {
  newPassword: "",
  confirmNewPassword: "",
}

export const ResetFormContainer = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const location = useLocation()
  const token = parseUrl(location.search).query.token as string

  const methods = useForm<ResetInput>({
    mode: "onChange",
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
    setError,
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const { mutate: resetPassword, isLoading, error } = useReset()

  const onSubmitHandler: SubmitHandler<ResetInput> = ({ newPassword }) => {
    if (token) {
      resetPassword({ newPassword, token }, { onSuccess: () => setIsPasswordChanged(true) })
    }
  }

  useEffect(() => {
    if (isAxiosError(error)) {
      setError("newPassword", { type: "validate", message: "" })
      setError("confirmNewPassword", {
        type: "validate",
        message:
          error.response?.data.errorMessage === "No value present"
            ? "Reset password link is expired"
            : error.message,
      })
    }
  }, [error, setError])

  if (!token) {
    return <Navigate to={HOME} replace />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ResetForm
          defaultValues={defaultValues}
          isLoading={isLoading}
          isPasswordChanged={isPasswordChanged}
        />
      </form>
    </FormProvider>
  )
}
