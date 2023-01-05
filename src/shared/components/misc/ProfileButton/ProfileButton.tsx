import { useNavigate } from "react-router-dom"
import { FlexItem, Flex, Spacer, Copy, Hidden } from "@/shared/components"
import { USER_MANAGEMENT } from "@/constants"
import { SProfileButton } from "./ProfileButton.styles"

export const ProfileButton = () => {
  const navigate = useNavigate()

  const userInfo = window.localStorage.getItem("user")
  const initials = userInfo
    ? JSON.parse(userInfo).firstName[0] + JSON.parse(userInfo).lastName[0]
    : ""
  //TODO: check everything works correct
  const organization = window.localStorage.getItem("organization")
    ? JSON.parse(window.localStorage.getItem("organization") || "{}").name
    : "Global Corporation"

  return (
    <Flex align="center">
      <Hidden above="sm">
        <FlexItem>
          <Copy scale={10} bold color="system-black">
            {organization}
          </Copy>
        </FlexItem>
      </Hidden>
      <Spacer size={12} horizontal />
      <FlexItem>
        <SProfileButton onClick={() => navigate(USER_MANAGEMENT)}>
          <Copy scale={8} bold color="system-black">
            {initials}
          </Copy>
        </SProfileButton>
      </FlexItem>
    </Flex>
  )
}
