import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconAccount } from "@/shared/icons"
import { logoutUserFn } from "@/api/authApi"

export interface ILoggedOutLabelProps {
  isTransparent?: boolean
}

export const LoggedOutLabel: React.FC<ILoggedOutLabelProps> = ({ isTransparent }) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  // TODO: use Zustand
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
  }

  return (
    <Dropdown
      asChild
      trigger={
        <ButtonIcon
          type="button"
          ariaLabel="Account button"
          icon={
            <IconAccount
              width={32}
              height={32}
              fixedSize={true}
              theme={isTransparent ? "transparent" : "default"}
              css={{
                borderRadius: "$rounded",
                cursor: "pointer",
              }}
            />
          }
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        />
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
  )
}
