import { Flex, FormSelect, Copy, Spacer } from "@/shared/components"
import { OrganizationType } from "@/profile"

interface ISwitchOrganizationProps {
  setUserOrganization: Function
  userOrganization: OrganizationType | string
}

const organizationTypeList: OrganizationType[] = Object.values(OrganizationType)

export const SwitchOrganization: React.FC<ISwitchOrganizationProps> = ({
  setUserOrganization,
  userOrganization,
}) => {
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
          labelProps={{ hidden: true }}
          description="Select organization"
          value={userOrganization}
          onValueChange={(val: OrganizationType) => {
            console.log("onValueChange ", val)
            setUserOrganization(val)
          }}
          options={organizationTypeList}
        />
      </Flex>
    </>
  )
}
