import { useEffect, useState } from "react"
import { Flex, FormSelect, Copy, Spacer } from "@/shared/components"
import { useQuery } from "react-query"
import { IUserOrganizationResponse } from "@/api/types"
import { getUserOrganizationsFn } from "@/api/userApi"

export const SwitchOrganization = () => {
  const organization: IUserOrganizationResponse = JSON.parse(
    localStorage.getItem("organization") || "{}",
  )

  const [currentOrganization, setCurrentOrganization] =
    useState<IUserOrganizationResponse>(organization)
  const [organizations, setOrganizations] = useState<IUserOrganizationResponse[]>([])
  const organizationsList: string[] = organizations.map((i) => i?.label || "")

  const { isLoading, isFetching, refetch } = useQuery(
    ["getAllOrganizations"],
    () => getUserOrganizationsFn(),
    {
      enabled: false,
      onSuccess: (data) => {
        setOrganizations(data)
      },
    },
  )

  useEffect(() => {
    if (organizations.length === 0) {
      refetch()
    }
  }, [organizations, refetch])

  return (
    <>
      <Copy scale={{ "@initial": 8, "@sm": 7 }} bold color={"system-black"}>
        Switch organization
      </Copy>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <Flex direction="column">
        <FormSelect
          name="selectOrganization"
          label="Select organization*"
          labelProps={{ hidden: true, required: true }}
          description="Select organization"
          value={currentOrganization.label || ""}
          onValueChange={(val: string) => {
            const newOrg =
              organizations.find((i) => i.label === val) || ({} as IUserOrganizationResponse)

            setCurrentOrganization(newOrg)
            localStorage.setItem("organization", JSON.stringify(newOrg))
          }}
          options={organizationsList}
        />
      </Flex>
    </>
  )
}
