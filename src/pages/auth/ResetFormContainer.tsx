import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetForm } from "./ResetForm"

const resetSchema = object({
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string()
    .min(1, "Confirm password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export type ResetInput = TypeOf<typeof resetSchema>

const defaultValues: ResetInput = {
  email: "",
  password: "",
  confirmPassword: "",
}

export const ResetFormContainer = () => {
  const navigate = useNavigate()

  const methods = useForm<ResetInput>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(resetSchema),
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

  const onSubmitHandler: SubmitHandler<ResetInput> = (values) => {
    console.log(values)
    // TODO: call request to the BE with new password
    navigate("/login")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ResetForm defaultValues={defaultValues} isLoading={false} />
      </form>
    </FormProvider>
  )
}
