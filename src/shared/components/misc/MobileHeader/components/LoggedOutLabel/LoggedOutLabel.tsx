import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { Dropdown, DropdownItem, FlexItem, Stack, Flex, Spacer, Copy } from "@/shared/components"
import { logoutUserFn } from "@/api/authApi"
import { SLoggedOutButton } from "./LoggedOutLabel.styles"

export interface ILoggedOutLabelProps {
  isTransparent?: boolean
}

export const LoggedOutLabel: React.FC<ILoggedOutLabelProps> = ({ isTransparent }) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  // TODO: use Zustand
  const refreshToken = window.localStorage.getItem("refreshToken") || ""
  const navigate = useNavigate()

  const userInfo = window.localStorage.getItem("user")
  const initials = userInfo
    ? JSON.parse(userInfo).firstName[0] + JSON.parse(userInfo).lastName[0]
    : ""
  //TODO: get organization name by ID (userInfo ? JSON.parse(userInfo).activeOrganizationId : "Global Corporation")
  const organization = "Global Corporation"

  console.log(userInfo)

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
  }

  return (
    <Flex align="center">
      <FlexItem>
        <Copy scale={10} bold color="system-black">
          {organization}
        </Copy>
      </FlexItem>
      <Spacer size={12} horizontal />
      <Dropdown
        asChild
        trigger={
          <FlexItem>
            <SLoggedOutButton
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Copy scale={8} bold color="system-black">
                {initials}
              </Copy>
            </SLoggedOutButton>
          </FlexItem>
        }
        open={isActionDropdownOpen}
        onOpenChange={() => setActionDropdownOpen(!isActionDropdownOpen)}
        contentCss={{
          paddingY: "$0",
          borderRadius: "$8",
        }}
        // disabled={disabled}
      >
        <Stack space={0} dividers>
          <DropdownItem key={"Logout"} label={"Logout"} onSelect={handleLogoutClick} />
        </Stack>
      </Dropdown>
    </Flex>
  )
}
