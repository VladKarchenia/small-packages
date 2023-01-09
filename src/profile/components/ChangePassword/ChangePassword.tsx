import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useDrawerActions } from "@/shared/components"
import { ChangeInput } from "@/api/types"
import { updateUserPasswordFn } from "@/api/userApi"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { ChangePasswordForm } from "./ChangePasswordForm"

export interface IChangePasswordProps {
  closeDrawer?: Function
}

const defaultValues: ChangeInput = {
  oldPassword: "",
  newPassword: "",
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
  const navigate = useNavigate()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { close } = useDrawerActions()

  const { mutate: updatePassword } = useMutation(
    ({ oldPassword, newPassword }: ChangeInput) => updateUserPasswordFn(oldPassword, newPassword),
    {
      onSuccess: () => {
        navigate("/login")
        toast.success("Your password was successfully changed", {
          icon: false,
          position: "bottom-right",
          progressStyle: {
            backgroundColor: "black",
          },
        })
      },
      // onError: (error: any) => {
      //   if (Array.isArray((error as any).response.data.error)) {
      //     ;(error as any).response.data.error.forEach((el: any) =>
      //       toast.error(el.message, {
      //         position: "top-right",
      //       }),
      //     )
      //   } else {
      //     toast.error((error as any).response.data.message, {
      //       position: "top-right",
      //     })
      //   }
      // },
    },
  )

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<ChangeInput> = (values) => {
    updatePassword(values)
    // TODO: add this call after successful password change

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
