import { rgba as polishedRgba } from "polished"

import { theme } from "@/config"

export const rgba = (color: keyof typeof theme["colors"], alpha: number) =>
  polishedRgba(theme.colors[color], alpha)
