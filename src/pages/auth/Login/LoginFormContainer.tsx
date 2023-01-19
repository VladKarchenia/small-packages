import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { loginUserFn } from "@/api/authApi"
import { LoginInput } from "@/api/types"
import { LoginForm } from "./LoginForm"

// TODO: Invalid email or password error after request

const defaultValues: LoginInput = {
  username: "",
  password: "",
  //rememberMe boolean field probably should be set here
}

export const LoginFormContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = ((location.state as any)?.from.pathname as string) || "/"

  const methods = useForm<LoginInput>({
    mode: "onChange",
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        // toast.success("You successfully logged in")
        navigate(from)
      },
    },
  )

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <LoginForm defaultValues={defaultValues} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
