import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { RecoveryInput } from "@/api/types"
import { RecoveryForm } from "./RecoveryForm"

// TODO: Invalid email error after request

const defaultValues: RecoveryInput = {
  email: "",
}

export const RecoveryFormContainer = () => {
  const methods = useForm<RecoveryInput>({
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
