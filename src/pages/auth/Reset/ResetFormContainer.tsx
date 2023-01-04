import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { parseUrl } from "query-string"
import { resetPasswordFn } from "@/api/authApi"
import { ResetInput } from "@/api/types"
import { ResetForm } from "./ResetForm"

const defaultValues: ResetInput = {
  newPassword: "",
  confirmNewPassword: "",
}

export const ResetFormContainer = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const location = useLocation()
  const token = parseUrl(location.search).query.token as string

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

  const { mutate: resetPassword } = useMutation(
    (data: { newPassword: string; token: string }) => resetPasswordFn(data),
    {
      onSuccess: () => {
        setIsPasswordChanged(true)
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

  const onSubmitHandler: SubmitHandler<ResetInput> = ({ newPassword }) => {
    if (token) {
      resetPassword({ newPassword, token })
    }
  }

  if (!token) {
    return <Navigate to="/" replace />
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
