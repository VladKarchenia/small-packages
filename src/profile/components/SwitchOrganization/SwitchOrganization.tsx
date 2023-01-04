import { Flex, FormSelect, Copy, Spacer } from "@/shared/components"

interface ISwitchOrganizationProps {
  setUserOrganization: Function
  userOrganization: string
}

const organizationTypeList: string[] = ["1", "2", "3"]

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
          labelProps={{ hidden: true, required: true }}
          description="Select organization"
          value={userOrganization}
          onValueChange={(val: string) => {
            setUserOrganization(val)
          }}
          options={organizationTypeList}
        />
      </Flex>
    </>
  )
}
