import { rgba as polishedRgba } from "polished"

import { theme } from "@/stitches/theme"

export const rgba = (color: keyof typeof theme["colors"], alpha: number) =>
  polishedRgba(theme.colors[color], alpha)
