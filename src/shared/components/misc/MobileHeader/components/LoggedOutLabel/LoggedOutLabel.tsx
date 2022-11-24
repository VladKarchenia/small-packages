import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconAccount } from "@/shared/icons"
import { useMutation } from "react-query"
import { logoutUserFn } from "@/api/authApi"

export interface ILoggedOutLabelProps {
  isTransparent?: boolean
}

export const LoggedOutLabel: React.FC<ILoggedOutLabelProps> = ({ isTransparent }) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const navigate = useNavigate()

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

  const handleLogoutClick = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <Dropdown
      asChild
      trigger={
        <ButtonIcon
          type="button"
          ariaLabel="Show more button"
          icon={
            <IconAccount
              width={32}
              height={32}
              fixedSize={true}
              theme={isTransparent ? "transparent" : "default"}
              css={{
                borderRadius: "$rounded",
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
