import { Overlay } from "@radix-ui/react-dialog"
import { styled } from "@/config"
import { easing, rgba, animations } from "@/utils"
import { MODAL_ANIMATION_DURATION } from "@/constants"

export const SModalOverlay = styled(Overlay, {
  position: "fixed",
  zIndex: "$9",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundColor: rgba("neutrals-9", 0.4),
  animationDuration: `${MODAL_ANIMATION_DURATION}ms`,
  animationFillMode: "both",
  animationTimingFunction: easing.smooth(),
  backdropFilter: "blur(3px)",

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
