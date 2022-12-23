import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import {
  HeaderBar,
  Spacer,
  Flex,
  Stack,
  Grid,
  useDrawerActions,
  Link,
  Copy,
} from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"
import { logoutUserFn } from "@/api/authApi"
import { ProfileDrawer, OrganizationType, SwitchOrganization, ChangePassword } from "@/profile"

interface IProfileMobileProps {
  setUserOrganization: Function
  userOrganization: OrganizationType | string
}

export const ProfileMobile = ({ setUserOrganization, userOrganization }: IProfileMobileProps) => {
  const navigate = useNavigate()
  const { close } = useDrawerActions()
  //TODO: move logoutUser function into separate file/module
  const { mutate: logoutUser, isLoading } = useMutation(async () => await logoutUserFn(), {
    onSuccess: (data) => {
      window.location.href = "/login"
    },
    onError: (error: any) => {
      if (Array.isArray(error.response.data.error)) {
        error.data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          }),
        )
      } else {
        toast.error(error.response.data.message, {
          position: "top-right",
        })
      }
    },
  })

  const handleResetPasswordClick = () => {
    close("changePasswordDrawer")
  }

  const handleLogoutClick = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <>
      <HeaderBar title="User profile" onClick={() => navigate("/")} />
      <Spacer size={{ "@initial": 24, "@sm": 0 }} />
      <Grid>
        <Flex direction="column" css={{ overflow: "auto" }}>
          <Stack space={16}>
            <ProfileDrawer
              drawerName="switchOrganizationDrawer"
              drawerTitle="User profile"
              value={userOrganization}
              placeholder="Switch organization"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={
                <SwitchOrganization
                  userOrganization={userOrganization}
                  setUserOrganization={setUserOrganization}
                />
              }
            />
            <ProfileDrawer
              drawerName="changePasswordDrawer"
              drawerTitle="User profile"
              value={""}
              placeholder="Change password"
              closeIcon={<IconChevronLeft />}
              suffix={<IconChevronRight />}
              drawerForm={<ChangePassword closeDrawer={handleResetPasswordClick} />}
            />
          </Stack>
        </Flex>
        <Spacer size={16} />
        <Link
          onClick={handleLogoutClick}
          css={{
            width: "100%",
            display: "block",
          }}
        >
          <Copy scale={{ "@initial": 8, "@sm": 8 }} color={"system-black"} bold>
            Logout
          </Copy>
        </Link>
      </Grid>
    </>
  )
}
