import { theme } from "@/stitches/theme"

const inset = (color: string) => `inset 0 0 0 1px ${color}`

export const boxShadows = {
  // Use when the box-shadow is applied inset
  input: {
    initial: inset(theme.colors["neutrals-4"]),
    hover: inset(theme.colors["neutrals-7"]),
    focus: inset(theme.colors["neutrals-7"]),
    error: inset(theme.colors["special-error"]),
  },
}
