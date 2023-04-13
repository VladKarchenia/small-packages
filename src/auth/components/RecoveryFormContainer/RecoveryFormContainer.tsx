import { useEffect } from "react"
import { isAxiosError } from "axios"
import { Navigate } from "react-router-dom"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { useAuthStore } from "@/store"
import { RecoveryInput } from "@/api/types"
import { useRecovery } from "@/auth/hooks"
import { HOME } from "@/constants"

import { RecoveryForm } from "@/auth/components"

const defaultValues: RecoveryInput = {
  email: "",
}

export const RecoveryFormContainer = () => {
  const user = useAuthStore((state) => state.user)
  const methods = useForm<RecoveryInput>({
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

  const { mutate: forgotPassword, isLoading, error } = useRecovery()

  const onSubmitHandler: SubmitHandler<RecoveryInput> = (values) => {
    forgotPassword(values)
  }

  useEffect(() => {
    if (isAxiosError(error)) {
      setError("email", {
        type: "validate",
        message:
          error.response?.data.errorMessage === "No value present"
            ? "Invalid email"
            : error.message,
      })
    }
  }, [error, setError])

  if (user.id) {
    return <Navigate to={HOME} replace />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <RecoveryForm defaultValues={defaultValues} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
