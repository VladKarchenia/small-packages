import { Overlay } from "@radix-ui/react-dialog"

import { styled } from "@/stitches/config"
import { animations, easing, rgba } from "@/stitches/utils"

export const SDrawerOverlay = styled(Overlay, {
  backgroundColor: rgba("neutrals-9", 0.4),
  zIndex: "$9",
  inset: 0,
  height: "100%",
  animation: `${easing.smooth({ duration: 400 })} both`,

  "&[data-state='open']": {
    animationName: animations.fadeIn,
  },

  "&[data-state='closed']": {
    animationName: animations.fadeOut,
  },

  variants: {
    nested: {
      false: { position: "fixed" },
      true: { position: "absolute" },
    },
  },

  defaultVariants: {
    nested: false,
  },
})
