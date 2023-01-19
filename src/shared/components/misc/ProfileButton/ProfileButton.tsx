import { useNavigate } from "react-router-dom"

import { USER_MANAGEMENT } from "@/constants"

import { ButtonIcon } from "@/shared/components"
import { IconAccount } from "@/shared/icons"

export const ProfileButton = () => {
  const navigate = useNavigate()

  return (
    <ButtonIcon
      type="button"
      ariaLabel="Profile button"
      icon={
        <IconAccount
          width={32}
          height={32}
          fixedSize={true}
          css={{
            borderRadius: "$rounded",
            cursor: "pointer",
          }}
        />
      }
      onClick={() => navigate(USER_MANAGEMENT)}
    />
  )
}
