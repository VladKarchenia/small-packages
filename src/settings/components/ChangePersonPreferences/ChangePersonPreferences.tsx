import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { shallow } from "zustand/shallow"

import { updatePersonPreferencesFn } from "@/api/userApi"
import { ChangePersonPreferencesInput } from "@/api/types"
import {
  formatPersonPreferenceRequestData,
  getUserShipmentPreferences,
  showToast,
} from "@/shared/utils"
import { useAuthStore } from "@/store"

import { ChangePersonPreferencesForm } from "./ChangePersonPreferencesForm"

export const ChangePersonPreferences = () => {
  const [settings, organization, setSettings] = useAuthStore(
    (state) => [state.settings, state.organization, state.setSettings],
    shallow,
  )
  const defaultUserShipmentPreferences = getUserShipmentPreferences(
    settings?.userShipmentPreferences || null,
    organization.id || null,
  )

  const methods = useForm<ChangePersonPreferencesInput>({
    mode: "onChange",
    defaultValues: defaultUserShipmentPreferences,
  })
  const { handleSubmit } = methods

  const { mutate: updatePersonPreferences, isLoading } = useMutation(
    (data: ChangePersonPreferencesInput) =>
      updatePersonPreferencesFn(formatPersonPreferenceRequestData(data)),
    {
      onSuccess: (data) => {
        setSettings({ ...settings, userShipmentPreferences: data })

        showToast({ type: "success", text: "Saved successfully" })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )

  const onSubmitHandler: SubmitHandler<ChangePersonPreferencesInput> = (values) => {
    updatePersonPreferences(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ChangePersonPreferencesForm isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
