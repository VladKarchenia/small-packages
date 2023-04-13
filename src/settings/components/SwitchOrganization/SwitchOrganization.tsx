import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { useQuery } from "react-query"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { getUserOrganizationsFn } from "@/api/userApi"
import { IUserOrganization } from "@/api/types"
import { showToast } from "@/shared/utils"
import { useUserSettings } from "@/shared/data"

import { FormSelect, Spacer, Title } from "@/shared/components"

export const SwitchOrganization = () => {
  const [organization, setOrganization, setSettings] = useAuthStore(
    (state) => [state.organization, state.setOrganization, state.setSettings],
    shallow,
  )
  const [currentOrganization, setCurrentOrganization] = useState<IUserOrganization>(organization)

  const { isLoading, data: organizations } = useQuery("allOrganizations", getUserOrganizationsFn, {
    staleTime: Infinity,
    onError: (error) => {
      if (isAxiosError(error)) {
        showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
      }
    },
  })

  const { data: settings } = useUserSettings(currentOrganization?.id)

  useEffect(() => {
    if (settings) {
      setSettings(settings)
    }
  }, [settings, setSettings])

  return (
    <>
      <Title as="h3" scale={5} color="theme-b-n3">
        Switch organization
      </Title>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <FormSelect
        name="selectOrganization"
        label="Select organization"
        labelProps={{ hidden: true, required: true }}
        description="Select organization"
        value={currentOrganization.label}
        onValueChange={(value) => {
          const newOrg = organizations?.find((i) => i.label === value) || ({} as IUserOrganization)

          setCurrentOrganization(newOrg)
          setOrganization(newOrg)
        }}
        options={organizations?.map((i) => i?.label || "") || []}
        disabled={isLoading}
      />
    </>
  )
}
