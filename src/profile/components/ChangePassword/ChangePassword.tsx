import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ChangeInput } from "@/api/types"
import { ChangePasswordForm } from "./ChangePasswordForm"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { useDrawerActions } from "@/shared/components"

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
  const methods = useForm<ChangeInput>({
    mode: "onChange",
    defaultValues,
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { close } = useDrawerActions()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])
  const onSubmitHandler: SubmitHandler<ChangeInput> = (values) => {
    // TODO: call request to the BE with new password

    // TODO: add this call after successful password change

    // toast.success("Your password was successfully changed")
    // if (closeDrawer) closeDrawer()
    if (!isSmallAndAbove) {
      close("changePasswordDrawer")
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ChangePasswordForm defaultValues={defaultValues} isLoading={false} />
      </form>
    </FormProvider>
  )
}
