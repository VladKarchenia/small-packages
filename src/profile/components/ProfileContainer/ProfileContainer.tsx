import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import { ProfileDesktop, ProfileMobile } from "@/profile/components"

export const ProfileContainer = () => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  if (isSmallAndAbove) return <ProfileDesktop />

  return <ProfileMobile />
}
