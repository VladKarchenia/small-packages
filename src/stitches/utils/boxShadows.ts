import { Colors } from "@/stitches/types"
import { rgba } from "./colors"

const inset = (color: Colors) => `inset 0 0 0 1px var(--colors-${color})`

export const boxShadows = {
  // Use when the box-shadow is applied inset
  input: {
    initial: inset("theme-n4-tr"),
    hover: inset("theme-n6-n10"),
    focus: inset("theme-vl-n3"),
    error: inset("special-error"),
  },
  toast: `0 4px 10px 0 ${rgba("neutrals-6", 0.22)}`,
  tooltip: `0 4px 10px -2px ${rgba("neutrals-8", 0.12)}`,
  dropdown: `0 4px 15px 0 ${rgba("neutrals-8", 0.12)}`,
  modal: `0 4px 20px -2px ${rgba("neutrals-8", 0.18)}`,
  switch: `0 1px 2px 0 ${rgba("neutrals-12", 0.2)}`,
}
