//import { Role } from "@/shared/types"

import { Breadcrumbs, Spacer, Title } from "@/shared/components"
import { SettingsTabs } from "@/settings/components"

export const SettingsDesktop = () => {
  //const user = useAuthStore((state) => state.user)
  //const role = user?.authorities?.[0]?.authority

  return (
    <>
      <Breadcrumbs />
      <Title as="h2" scale={2} color="theme-b-n3">
        Settings
      </Title>
      <Spacer size={40} />
      {/* <Stack space={40}>
       } {role === Role.Admin || role === Role.Ops ? <SwitchOrganization /> : null
        <ChangePassword />
      </Stack> */}

      <SettingsTabs />
    </>
  )
}

//TODO: feature for admin settings
