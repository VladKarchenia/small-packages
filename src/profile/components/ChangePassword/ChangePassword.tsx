import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ChangeInput, ResetInput } from "@/api/types"
import { ChangePasswordForm } from "./ChangePasswordForm"

export interface IChangePasswordProps {
  closeDrawer?: Function
}

const defaultValues: ChangeInput = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
}

export const ChangePassword: React.FC<IChangePasswordProps> = ({
  closeDrawer,
}: IChangePasswordProps) => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const methods = useForm<ChangeInput>({
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
    toast.success("Your password was successfully changed")
    if (closeDrawer) closeDrawer()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ChangePasswordForm
          defaultValues={defaultValues}
          isLoading={false}
          isPasswordChanged={isPasswordChanged}
        />
      </form>
    </FormProvider>
  )
}
