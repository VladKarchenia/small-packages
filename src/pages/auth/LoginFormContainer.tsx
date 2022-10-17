import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { getMeFn, loginUserFn } from "@/api/authApi"
import { useStateContext } from "@/shared/state"
import { LoginForm } from "./LoginForm"

const loginSchema = object({
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export type LoginInput = TypeOf<typeof loginSchema>
// export type LoginInput = TypeOf<typeof loginSchema> & { rememberMe: boolean }

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
    defaultValues,
    resolver: zodResolver(loginSchema),
    reValidateMode: "onBlur",
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
  const query = useQuery(["authUser"], getMeFn, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext?.dispatch({ type: "SET_USER", payload: data })
    },
  })

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        query.refetch()
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
