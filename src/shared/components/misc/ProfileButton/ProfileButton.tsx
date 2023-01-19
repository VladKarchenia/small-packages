import { useNavigate } from "react-router-dom"

import { USER_MANAGEMENT } from "@/constants"
import { Role } from "@/shared/types"

import { FlexItem, Flex, Spacer, Copy } from "@/shared/components"

import { SProfileButton } from "./ProfileButton.styles"

export const ProfileButton = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const organization = JSON.parse(localStorage.getItem("organization") || "{}")
  const role = user?.authorities?.[0]?.authority
  const initials = user?.firstName[0] + user?.lastName[0] || ""
  const organizationName = role === Role.Admin || role === Role.Ops ? organization?.label : ""

  return (
    <Flex align="center">
      {organizationName ? (
        <>
          <FlexItem>
            <Copy scale={10} bold color="system-black">
              {organizationName}
            </Copy>
          </FlexItem>
          <Spacer size={12} horizontal />
        </>
      ) : null}
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
