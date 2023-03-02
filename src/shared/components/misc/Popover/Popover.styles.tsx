import { Content, Trigger } from "@radix-ui/react-popover"

import { keyframes, styled } from "@/stitches/config"
import { rgba } from "@/stitches/utils"

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY($2)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-$2)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-$2)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX($2)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

export const SPopoverContent = styled(Content, {
  border: "1px solid $neutrals-4",
  borderRadius: "$2",
  padding: "$24",
  backgroundColor: "$system-white",
  maxWidth: "100%",
  boxShadow: `0 $space$4 $space$16 ${rgba("system-black", 0.12)}`,
  zIndex: "$1",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "ease-in-out",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    "&[data-state='open']": {
      "&[data-side='top']": { animationName: slideDownAndFade },
      "&[data-side='right']": { animationName: slideLeftAndFade },
      "&[data-side='bottom']": { animationName: slideUpAndFade },
      "&[data-side='left']": { animationName: slideRightAndFade },
    },
  },
})

export const SPopoverTrigger = styled(Trigger, {
  position: "relative",
  keyboardFocus: {
    "& > *": {
      outline: "1px solid $neutrals-9",
      outlineOffset: "$2",
      transition: "all 0.3s ease",
    },
  },
})
