import { useEffect } from "react"
import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

import { updateUserPasswordFn } from "@/api/userApi"
import { ChangeInput } from "@/api/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { showToast } from "@/shared/utils"

import { useDrawerActions } from "@/shared/components"

import { ChangePasswordForm } from "./ChangePasswordForm"

const defaultValues: ChangeInput = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
}

export const ChangePassword = () => {
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

  const { mutate: updatePassword } = useMutation(
    (data: ChangeInput) => updateUserPasswordFn(data),
    {
      onSuccess: () => {
        showToast({ type: "success", text: "Your password was successfully changed" })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const onSubmitHandler: SubmitHandler<ChangeInput> = (values) => {
    updatePassword(values)

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
