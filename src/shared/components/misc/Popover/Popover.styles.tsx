import { Content, Trigger } from "@radix-ui/react-popover"
import { keyframes, styled } from "@/config"
import { rgba } from "@/utils"

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

export const SPopoverContent = styled(Content, {
  border: "1px solid $neutrals-4",
  borderRadius: "$2",
  padding: "$24",
  backgroundColor: "$neutrals-0",
  maxWidth: "100%",
  boxShadow: `0px 8px 24px ${rgba("system-black", 0.08)}`,
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
