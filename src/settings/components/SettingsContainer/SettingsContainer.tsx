import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import { SettingsDesktop, SettingsMobile } from "@/settings/components"

export const SettingsContainer = () => {
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)

  if (isSmallAndAbove) return <SettingsDesktop />

  return <SettingsMobile />
}
