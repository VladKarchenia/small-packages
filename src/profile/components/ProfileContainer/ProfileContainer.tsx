import { useState } from "react"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { ProfileDesktop, ProfileMobile } from "@/profile"

export const ProfileContainer = () => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  // TODO: fix it after BE changes with available organizations
  const [userOrganization, setUserOrganization] = useState<string>("1")

  if (isSmallAndAbove)
    return (
      <ProfileDesktop
        userOrganization={userOrganization}
        setUserOrganization={setUserOrganization}
      />
    )

  return (
    <ProfileMobile userOrganization={userOrganization} setUserOrganization={setUserOrganization} />
  )
}
