import { Copy, Spacer, Stack } from "@/shared/components"
import { SwitchOrganization, ChangePassword } from "@/profile"
import { Role } from "@/shared/types"

export const ProfileDesktop = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  return (
    <>
      {/* TODO: it should be Title, so need to fix it later */}
      <Copy scale={5} color="system-black" bold>
        User Profile
      </Copy>
      <Spacer size={40} />
      <Stack space={40}>
        {role === Role.Admin || role === Role.Ops ? <SwitchOrganization /> : null}
        <ChangePassword />
      </Stack>
    </>
  )
}
