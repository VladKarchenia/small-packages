import { colors } from "./colors"

export type ColorShade =
  | "lightest"
  | "lighter"
  | "light"
  | "primary"
  | "dark"
  | "darker"
  | "darkest"

export type BrandColors = `brand-${keyof typeof colors.brand}-${ColorShade}`
export type SpecialColors = `special-${keyof typeof colors.special}`
export type SystemColors = `system-${keyof typeof colors.system}`
export type NeutralsColors = `neutrals-${keyof typeof colors.neutrals}`

export type Colors = BrandColors | SpecialColors | SystemColors | NeutralsColors
