import { Copy, Spacer, Flex, Stack } from "@/shared/components"
import { SwitchOrganization, ChangePassword } from "@/profile"

interface IProfileDesktopProps {
  setUserOrganization: Function
  userOrganization: string
}

export const ProfileDesktop = ({ setUserOrganization, userOrganization }: IProfileDesktopProps) => {
  return (
    <Flex direction="column" css={{ maxWidth: "896px" }}>
      {/* TODO: it should be Title, so need to fix it later */}
      <Copy scale={5} color="system-black" bold>
        User Profile
      </Copy>
      <Spacer size={40} />
      <Stack space={40}>
        <SwitchOrganization
          userOrganization={userOrganization}
          setUserOrganization={setUserOrganization}
        />
        <ChangePassword />
      </Stack>
    </Flex>
  )
}
