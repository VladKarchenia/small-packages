import { Content } from "@radix-ui/react-popover"

import { keyframes, styled } from "@/stitches/config"
import { boxShadows } from "@/stitches/utils"

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
  backgroundColor: "$theme-w-n8",
  maxWidth: "100%",
  height: "max-content",
  boxShadow: boxShadows.dropdown,
  zIndex: "$2",
  outline: "none",
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
