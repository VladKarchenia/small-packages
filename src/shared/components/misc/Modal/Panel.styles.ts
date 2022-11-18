import { DialogContent } from "@radix-ui/react-dialog"

import { styled, keyframes } from "@/config"
import { easing } from "@/utils"

import { MODAL_ANIMATION_DURATION } from "@/constants"

import { SModalContent } from "./Content.styles"
import { SModalCloseButton } from "./CloseButton.styles"

const fadeInRightUp = keyframes({
  "0%": { opacity: 0, transform: `translate(0, $24)` },
  "100%": { opacity: 1, transform: "translate(0, 0)" },
})

const fadeOutRightDown = keyframes({
  "0%": { opacity: 1, transform: "translate(0, 0)" },
  "100%": { opacity: 0, transform: `translate(0, $24)` },
})

const fadeInUp = keyframes({
  "0%": { opacity: 0, transform: `translate(-50%, $24)` },
  "100%": { opacity: 1, transform: "translate(-50%, 0)" },
})

const fadeOutDown = keyframes({
  "0%": { opacity: 1, transform: "translate(-50%, 0)" },
  "100%": { opacity: 0, transform: `translate(-50%, $24)` },
})

const fadeInUpCenter = keyframes({
  "0%": { opacity: 0, transform: `translate(-50%, calc(-50% + $24))` },
  "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
})

const fadeOutDownCenter = keyframes({
  "0%": { opacity: 1, transform: "translate(-50%, -50%)" },
  "100%": { opacity: 0, transform: `translate(-50%, calc(-50% + $24))` },
})

export const SModalPanel = styled(DialogContent, {
  zIndex: "$9",
  animationDuration: `${MODAL_ANIMATION_DURATION}ms`,
  animationFillMode: "both",
  animationTimingFunction: easing.smooth(),
  left: "50%",
  padding: "$$modalGap",
  display: "flex",
  maxHeight: "100%",
  maxWidth: "100%",

  "&[data-state='open']": {
    animationName: fadeInUp,
  },

  "&[data-state='closed']": {
    animationName: fadeOutDown,
  },

  variants: {
    nested: {
      false: { position: "fixed" },
      true: { position: "absolute" },
    },

    align: {
      top: {
        top: 0,
        bottom: "initial",
      },
      center: {
        top: "50%",
        bottom: "initial",

        "&[data-state='open']": {
          animationName: fadeInUpCenter,
        },

        "&[data-state='closed']": {
          animationName: fadeOutDownCenter,
        },
      },
      bottom: {
        top: "initial",
        bottom: 0,
      },
      bottomRight: {
        "&[data-state='open']": {
          animationName: fadeInRightUp,
        },

        "&[data-state='closed']": {
          animationName: fadeOutRightDown,
        },
      },
    },

    gap: {
      0: { $$modalGap: 0 },
      8: { $$modalGap: "$space$8" },
      16: { $$modalGap: "$space$16" },
      24: { $$modalGap: "$space$24" },
      32: { $$modalGap: "$space$32" },
    },

    fullscreen: {
      width: {
        padding: 0,

        width: "100%",

        [`${SModalContent}`]: {
          borderRadius: 0,
          maxWidth: "unset",
          width: "100%",
        },

        [`${SModalCloseButton}`]: {
          top: "$16",
          right: "$16",
        },
      },

      height: {
        padding: 0,

        height: "100%",

        [`${SModalContent}`]: {
          borderRadius: 0,
          maxHeight: "unset",
          height: "100%",
        },

        [`${SModalCloseButton}`]: {
          top: "$16",
          right: "$16",
        },
      },

      true: {
        padding: 0,

        height: "100%",
        width: "100%",

        [`${SModalContent}`]: {
          borderRadius: 0,
          maxHeight: "unset",
          maxWidth: "unset",
          height: "100%",
          width: "100%",
        },

        [`${SModalCloseButton}`]: {
          top: "$16",
          right: "$16",
        },
      },
    },
  },

  defaultVariants: {
    nested: false,

    align: "center",
  },
})
