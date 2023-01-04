import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { HeaderBar, Spacer, Stack, Grid, Link, Copy } from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"
import { logoutUserFn } from "@/api/authApi"
import { ProfileDrawer, SwitchOrganization, ChangePassword } from "@/profile"

interface IProfileMobileProps {
  setUserOrganization: Function
  userOrganization: string
}

export const ProfileMobile = ({ setUserOrganization, userOrganization }: IProfileMobileProps) => {
  const refreshToken = window.localStorage.getItem("refreshToken") || ""
  const navigate = useNavigate()

  const { isLoading, mutate: logoutUser } = useMutation(() => logoutUserFn(refreshToken), {
    onSuccess: () => {
      navigate("/login")
    },
    // onError: (error: any) => {
    //   if (Array.isArray(error.response.data.error)) {
    //     error.data.error.forEach((el: any) =>
    //       toast.error(el.message, {
    //         position: "top-right",
    //       }),
    //     )
    //   } else {
    //     toast.error(error.response.data.message, {
    //       position: "top-right",
    //     })
    //   }
    // },
  })

  const handleLogoutClick = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <>
      <HeaderBar title="User profile" onClick={() => navigate("/")} />
      <Spacer size={{ "@initial": 8, "@sm": 0 }} />
      <Grid>
        <Stack space={16}>
          <ProfileDrawer
            drawerTitle="User profile"
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
    </>
  )
}
