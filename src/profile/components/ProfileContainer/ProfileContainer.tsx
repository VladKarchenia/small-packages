import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"

import { ProfileDesktop, ProfileMobile } from "@/profile"

export const ProfileContainer = () => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  if (isSmallAndAbove) return <ProfileDesktop />

  return <ProfileMobile />
}
