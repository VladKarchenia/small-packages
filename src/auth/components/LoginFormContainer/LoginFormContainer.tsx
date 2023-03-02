import { useEffect } from "react"
import { isAxiosError } from "axios"
import { Navigate } from "react-router-dom"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { useAuthStore } from "@/store"
import { useLogin } from "@/auth/hooks"
import { LoginInput } from "@/api/types"
import { HOME } from "@/constants"

import { LoginForm } from "@/auth/components"

const defaultValues: LoginInput = {
  username: "",
  password: "",
}

export const LoginFormContainer = () => {
  const user = useAuthStore((state) => state.user)
  const methods = useForm<LoginInput>({
    mode: "onChange",
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
    setError,
  } = methods

  const { mutate: loginUser, isLoading, error } = useLogin()

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    if (isAxiosError(error)) {
      setError("username", { type: "validate", message: "" })
      setError("password", {
        type: "validate",
        message: error.response?.data.errorMessage || error.message,
      })
    }
  }, [error, setError])

  if (user) {
    return <Navigate to={HOME} replace />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <LoginForm defaultValues={defaultValues} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
