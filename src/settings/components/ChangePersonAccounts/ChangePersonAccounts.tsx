import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { shallow } from "zustand/shallow"

import { getUserSettingsFn, updatePersonAccountsFn } from "@/api/userApi"
import { ChangePersonAccountsInput } from "@/api/types"
import { showToast } from "@/shared/utils"
import { useAuthStore } from "@/store"
import { Carriers } from "@/shared/types"

import { ChangePersonAccountsForm } from "./ChangePersonAccountsForm"

export const ChangePersonAccounts = () => {
  const [settings, organization, setSettings] = useAuthStore(
    (state) => [state.settings, state.organization, state.setSettings],
    shallow,
  )
  const getDefaultAccountNameByCarrier = (carrier: Carriers) =>
    settings.accounts.length > 0
      ? settings.accounts.find((el) => el.carrier == carrier && el.default)?.name
      : null

  const getAccountInfoByCarrierName = (carrierName: string) => {
    const draftId = settings.accounts.find((el) => el.name == carrierName)?.id
    const accountId = draftId ? draftId : null
    const organizationId = organization.id

    return { accountId, organizationId }
  }

  const defaultValues: ChangePersonAccountsInput = {
    fedExName: `${getDefaultAccountNameByCarrier(Carriers.FedEx)}`,
    upsName: `${getDefaultAccountNameByCarrier(Carriers.UPS)}`,
    accounts: settings.accounts,
  }

  const methods = useForm<ChangePersonAccountsInput>({
    mode: "onChange",
    defaultValues: defaultValues,
  })
  const { handleSubmit } = methods

  const { mutate: updatePersonCarrierAccounts, isLoading } = useMutation(
    async (data: ChangePersonAccountsInput) =>
      //TODO: optimize if no changes
      (await updatePersonAccountsFn(getAccountInfoByCarrierName(data.fedExName))) &&
      (await updatePersonAccountsFn(getAccountInfoByCarrierName(data.upsName))),
    {
      onSuccess: async () => {
        const settings = await getUserSettingsFn(organization.id)
        setSettings(settings)

        showToast({ type: "success", text: "Saved successfully" })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )

  const onSubmitHandler: SubmitHandler<ChangePersonAccountsInput> = (values) => {
    updatePersonCarrierAccounts(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <ChangePersonAccountsForm isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
