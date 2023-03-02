import { keyframes } from "@/stitches/config"
import { Spaces } from "@/stitches/types"

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const fadeInUp = (space: Spaces) =>
  keyframes({
    from: {
      opacity: 0,
      transform: `translateY(${space}px)`,
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  })

const fadeOutDown = (space: Spaces) =>
  keyframes({
    from: {
      transform: "translateY(0)",
      opacity: 1,
    },
    to: {
      transform: `translateY(${space}px)`,
      opacity: 0,
    },
  })

const rotate = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
})

const scalePulse = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "80%, 100%": {
    opacity: 0,
    transform: "scale(0.75)",
  },
})

const opacityPulse = keyframes({
  "0%, 100%": {
    opacity: 0.25,
  },
  "50%": {
    opacity: 0.1,
  },
})

const slideIn = (from: "left" | "right") =>
  keyframes({
    "0%": {
      transform: `translateX(${from === "left" ? "-100%" : "100%"})`,
    },
    "100%": {
      transform: "translateX(0)",
    },
  })

const slideOut = (to: "left" | "right") =>
  keyframes({
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: `translateX(${to === "left" ? "-100%" : "100%"})`,
    },
  })

export const animations = {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeOutDown,

  rotate,
  scalePulse,
  opacityPulse,

  slideIn,
  slideOut,
}
