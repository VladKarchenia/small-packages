import { useState } from "react"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { ProfileDesktop, ProfileMobile } from "@/profile"

export enum OrganizationType {
  GoogleLLC = "Google LLC",
  Xiaomi = "Xiaomi",
  LG = "LG",
}

export const ProfileContainer = () => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const [userOrganization, setUserOrganization] = useState("")

  if (isSmallAndAbove)
    return (
      <ProfileDesktop
        userOrganization={userOrganization}
        setUserOrganization={setUserOrganization}
      />
    )
  else
    return (
      <ProfileMobile
        userOrganization={userOrganization}
        setUserOrganization={setUserOrganization}
      />
    )
}
