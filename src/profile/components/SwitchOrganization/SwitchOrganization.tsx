import { useState } from "react"
import { isAxiosError } from "axios"
import { useQuery } from "react-query"
import { shallow } from "zustand/shallow"

import { useAuthStore } from "@/store"
import { getUserOrganizationsFn } from "@/api/userApi"
import { IUserOrganization } from "@/api/types"
import { showToast } from "@/shared/utils"

import { Flex, FormSelect, Copy, Spacer } from "@/shared/components"

export const SwitchOrganization = () => {
  const [organization, setOrganization] = useAuthStore(
    (state) => [state.organization, state.setOrganization],
    shallow,
  )
  const [currentOrganization, setCurrentOrganization] = useState<IUserOrganization | null>(
    organization,
  )

  const { isLoading, data: organizations } = useQuery("allOrganizations", getUserOrganizationsFn, {
    staleTime: Infinity,
    onError: (error) => {
      if (isAxiosError(error)) {
        showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
      }
    },
  })

  return (
    <>
      <Copy scale={{ "@initial": 8, "@sm": 7 }} bold color="system-black">
        Switch organization
      </Copy>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <Flex direction="column">
        <FormSelect
          name="selectOrganization"
          label="Select organization*"
          labelProps={{ hidden: true, required: true }}
          description="Select organization"
          value={currentOrganization?.label || ""}
          onValueChange={(value) => {
            const newOrg =
              organizations?.find((i) => i.label === value) || ({} as IUserOrganization)

            setCurrentOrganization(newOrg)
            setOrganization(newOrg)
          }}
          options={organizations?.map((i) => i?.label || "") || []}
          disabled={isLoading}
        />
      </Flex>
    </>
  )
}
