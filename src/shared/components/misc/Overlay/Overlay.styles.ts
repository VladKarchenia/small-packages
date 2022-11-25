import { styled } from "@/config"

import { easing, rgba } from "@/utils"

export const SOverlay = styled("div", {
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: rgba("neutrals-9", 0.4),
  transition: easing.smooth({ duration: 400, property: "opacity" }),

  variants: {
    isVisible: {
      false: { opacity: 0 },
      true: { opacity: 1 },
    },
  },
})
