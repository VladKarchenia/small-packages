import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

import { logoutUserFn } from "@/api/authApi"

import { ButtonIcon } from "@/shared/components"
import { IconClock } from "@/shared/icons"

export const LogoutButton = () => {
  const navigate = useNavigate()

  const { mutate: logoutUser } = useMutation(() => logoutUserFn(), {
    onSuccess: () => {
      navigate("/login")
    },
  })

  return (
    <ButtonIcon
      type="button"
      ariaLabel="Logout button"
      icon={
        <IconClock
          width={32}
          height={32}
          fixedSize={true}
          css={{
            borderRadius: "$rounded",
            cursor: "pointer",
          }}
        />
      }
      onClick={() => logoutUser()}
    />
  )
}
