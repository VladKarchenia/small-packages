import { useNavigate } from "react-router-dom"
import { shallow } from "zustand/shallow"

import { PROFILE } from "@/constants"
import { useAuthStore } from "@/store"
import { Role } from "@/shared/types"

import { FlexItem, Flex, Spacer, Copy } from "@/shared/components"

import { SProfileButton } from "./ProfileButton.styles"

export const ProfileButton = () => {
  const navigate = useNavigate()
  const [user, organization] = useAuthStore((state) => [state.user, state.organization], shallow)
  const role = user?.authorities?.[0]?.authority
  const initials = user ? user?.firstName?.[0] + user?.lastName?.[0] : ""
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
        <SProfileButton onClick={() => navigate(PROFILE)}>
          <Copy scale={8} bold color="system-black">
            {initials}
          </Copy>
        </SProfileButton>
      </FlexItem>
    </Flex>
  )
}
