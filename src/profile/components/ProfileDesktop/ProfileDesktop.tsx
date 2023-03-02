import { useAuthStore } from "@/store"
import { Role } from "@/shared/types"

import { Breadcrumbs, Spacer, Stack, Title } from "@/shared/components"
import { SwitchOrganization, ChangePassword } from "@/profile/components"

export const ProfileDesktop = () => {
  const user = useAuthStore((state) => state.user)
  const role = user?.authorities?.[0]?.authority

  return (
    <>
      <Breadcrumbs />
      <Title as="h2">User Profile</Title>
      <Spacer size={40} />
      <Stack space={40}>
        {role === Role.Admin || role === Role.Ops ? <SwitchOrganization /> : null}
        <ChangePassword />
      </Stack>
    </>
  )
}
