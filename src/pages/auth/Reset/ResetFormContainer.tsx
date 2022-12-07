import { useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ResetInput } from "@/api/types"
import { ResetForm } from "./ResetForm"

const defaultValues: ResetInput = {
  password: "",
  confirmPassword: "",
}

export const ResetFormContainer = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const methods = useForm<ResetInput>({
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

  const onSubmitHandler: SubmitHandler<ResetInput> = (values) => {
    console.log(values)
    // TODO: call request to the BE with new password

    // TODO: add this call after successful password change
    setIsPasswordChanged(true)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ResetForm
          defaultValues={defaultValues}
          isLoading={false}
          isPasswordChanged={isPasswordChanged}
        />
      </form>
    </FormProvider>
  )
}
