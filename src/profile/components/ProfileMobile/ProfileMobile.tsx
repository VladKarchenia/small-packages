import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/store"
import { useLogout } from "@/auth/hooks"
import { Role } from "@/shared/types"
import { HOME, LOGIN } from "@/constants"

import { HeaderBar, Spacer, Stack, Grid, Link, Copy, GridContainer } from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"
import { ProfileDrawer, SwitchOrganization, ChangePassword } from "@/profile/components"

export const ProfileMobile = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const role = user?.authorities?.[0]?.authority

  const { mutate: logoutUser } = useLogout()

  const handleLogoutClick = () => {
    logoutUser()
    navigate(LOGIN)
  }

  return (
    <>
      <HeaderBar
        title="User profile"
        onClick={() => navigate(HOME)}
        css={{ paddingRight: "$40" }}
      />
      <Spacer size={{ "@initial": 8, "@sm": 0 }} />
      <GridContainer>
        <Grid>
          <Stack space={16}>
            {role === Role.Admin || role === Role.Ops ? (
              <ProfileDrawer
                drawerTitle="User profile"
                placeholder="Switch organization"
                closeIcon={<IconChevronLeft />}
                suffix={<IconChevronRight />}
                drawerForm={<SwitchOrganization />}
              />
            ) : null}
            <ProfileDrawer
              drawerTitle="User profile"
              placeholder="Change password"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={<ChangePassword />}
            />
            <Link
              onClick={handleLogoutClick}
              css={{
                width: "100%",
                justifyContent: "start",
                paddingBottom: "$16",
              }}
            >
              <Copy scale={{ "@initial": 8, "@sm": 8 }} color="system-black" bold>
                Logout
              </Copy>
            </Link>
          </Stack>
        </Grid>
      </GridContainer>
    </>
  )
}
