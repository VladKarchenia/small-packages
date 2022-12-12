import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getMeFn, loginUserFn } from "@/api/authApi"
import { useStateContext } from "@/shared/state"
import { LoginInput } from "@/api/types"

import { LoginForm } from "./LoginForm"

// TODO: Invalid email or password error after request

const defaultValues: LoginInput = {
  email: "",
  password: "",
  //rememberMe boolean field probably should be set here
}

export const LoginFormContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const from = ((location.state as any)?.from.pathname as string) || "/"

  const stateContext = useStateContext()

  const methods = useForm<LoginInput>({
    mode: "onChange",
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  // API Get Current Logged-in user
  const { refetch } = useQuery(["authUser"], getMeFn, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext?.dispatch({ type: "SET_USER", payload: data })
    },
    // possible settings
    // cacheTime: 60 * 1000,
    // staleTime: 30 * 1000,
  })

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        refetch()
        toast.success("You successfully logged in")
        navigate(from)
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          ;(error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            }),
          )
        } else {
          toast.error((error as any).response.data.message, {
            position: "top-right",
          })
        }
      },
    },
  )

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // ? Executing the loginUser Mutation
    loginUser(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <LoginForm defaultValues={defaultValues} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
