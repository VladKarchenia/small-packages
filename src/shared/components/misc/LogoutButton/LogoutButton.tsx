import { useLogout } from "@/auth/hooks"

import { ButtonIcon } from "@/shared/components"
import { IconLogout } from "@/shared/icons"

export const LogoutButton = () => {
  const { mutate: logoutUser } = useLogout()

  return (
    <ButtonIcon
      type="button"
      ariaLabel="Logout button"
      icon={<IconLogout />}
      onClick={() => logoutUser()}
    />
  )
}
