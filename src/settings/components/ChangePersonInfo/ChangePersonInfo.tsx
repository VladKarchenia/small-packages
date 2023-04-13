import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { shallow } from "zustand/shallow"

import { updatePersonInfoFn } from "@/api/userApi"
import { ChangePersonInfoInput } from "@/api/types"
import { showToast } from "@/shared/utils"
import { useAuthStore } from "@/store"

import { ChangePersonInfoForm } from "./ChangePersonInfoForm"

const defaultValues: ChangePersonInfoInput = {
  fullName: "",
  phone: "",
  username: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  darkTheme: false,
}

export const ChangePersonInfo = () => {
  const [user, setUser] = useAuthStore((state) => [state.user, state.setUser], shallow)

  const methods = useForm<ChangePersonInfoInput>({
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      fullName: `${user.firstName} ${user.lastName}` || defaultValues.fullName,
      phone: user.phone || defaultValues.phone,
      username: user.username || defaultValues.username,
      darkTheme: user.darkTheme || defaultValues.darkTheme,
    },
  })
  const { handleSubmit, resetField, watch } = methods
  const { phone, darkTheme } = watch()

  const { mutate: updatePersonInfo, isLoading } = useMutation(
    (data: ChangePersonInfoInput) => updatePersonInfoFn(data),
    {
      onSuccess: () => {
        const newPersonInfo = { ...user, phone, darkTheme }
        setUser(newPersonInfo)

        resetField("oldPassword")
        resetField("newPassword")
        resetField("confirmPassword")

        showToast({ type: "success", text: "Saved successfully" })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )

  const onSubmitHandler: SubmitHandler<ChangePersonInfoInput> = (values) => {
    updatePersonInfo(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ChangePersonInfoForm defaultValues={defaultValues} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
