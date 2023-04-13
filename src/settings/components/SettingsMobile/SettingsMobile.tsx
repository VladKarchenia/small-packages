import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/store"
import { useLogout } from "@/auth/hooks"
import { Role } from "@/shared/types"
import { HOME, LOGIN } from "@/constants"

import { HeaderBar, Spacer, Stack, Grid, Link, GridContainer } from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"
import {
  ChangePersonAccounts,
  ChangePersonInfo,
  ChangePersonPreferences,
  SettingsDrawer,
  SwitchOrganization,
} from "@/settings/components"

export const SettingsMobile = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const role = user.authorities?.[0]?.authority

  const { mutate: logoutUser } = useLogout()

  const handleLogoutClick = () => {
    logoutUser()
    navigate(LOGIN)
  }

  return (
    <>
      <HeaderBar title="Settings" onClick={() => navigate(HOME)} css={{ paddingRight: "$40" }} />
      <Spacer size={{ "@initial": 8, "@sm": 0 }} />
      <GridContainer>
        <Grid>
          <Stack space={16}>
            {role === Role.Admin || role === Role.Ops ? (
              <SettingsDrawer
                drawerTitle="Settings"
                placeholder="Switch organization"
                closeIcon={<IconChevronLeft />}
                suffix={<IconChevronRight />}
                drawerForm={<SwitchOrganization />}
              />
            ) : null}
            <SettingsDrawer
              drawerTitle="Settings"
              placeholder="General info"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={<ChangePersonInfo />}
            />
            <SettingsDrawer
              drawerTitle="Settings"
              placeholder="Preferences"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={<ChangePersonPreferences />}
            />
            <SettingsDrawer
              drawerTitle="Settings"
              placeholder="Accounts"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={<ChangePersonAccounts />}
            />
            <Link
              as="button"
              type="button"
              onClick={handleLogoutClick}
              fontWeight="semiBold"
              css={{
                width: "100%",
                justifyContent: "start",
                paddingBottom: "$16",
              }}
            >
              Logout
            </Link>
          </Stack>
        </Grid>
      </GridContainer>
    </>
  )
}
