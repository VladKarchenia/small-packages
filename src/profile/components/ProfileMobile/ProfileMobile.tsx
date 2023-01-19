import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

import { logoutUserFn } from "@/api/authApi"
import { Role } from "@/shared/types"

import { HeaderBar, Spacer, Stack, Grid, Link, Copy, GridContainer } from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"
import { ProfileDrawer, SwitchOrganization, ChangePassword } from "@/profile"

export const ProfileMobile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  const { isLoading, mutate: logoutUser } = useMutation(() => logoutUserFn(), {
    onSuccess: () => {
      navigate("/login")
    },
  })

  const handleLogoutClick = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <>
      <HeaderBar title="User profile" onClick={() => navigate("/")} css={{ paddingRight: "$40" }} />
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
              <Copy scale={{ "@initial": 8, "@sm": 8 }} color={"system-black"} bold>
                Logout
              </Copy>
            </Link>
          </Stack>
        </Grid>
      </GridContainer>
    </>
  )
}
