import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RecoveryForm } from "./RecoveryForm"

const resetSchema = object({
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
})

export type RecoveryInput = TypeOf<typeof resetSchema>

const defaultValues: RecoveryInput = {
  email: "",
}

export const RecoveryFormContainer = () => {
  const methods = useForm<RecoveryInput>({
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

  const onSubmitHandler: SubmitHandler<RecoveryInput> = (values) => {
    console.log(values)
    // TODO: call request to the BE with email
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <RecoveryForm defaultValues={defaultValues} isLoading={false} />
      </form>
    </FormProvider>
  )
}
