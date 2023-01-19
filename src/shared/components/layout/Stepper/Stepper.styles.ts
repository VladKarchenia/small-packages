import { motion } from "framer-motion"
import { styled } from "@/config"

export const SStepper = styled("div", {
  paddingBottom: "$40",

  "@sm": {
    paddingBottom: "$0",
  },
})

export const SStepperHeader = styled("div", {
  paddingX: "$16",
  position: "relative",
  // TODO: do we need this zIndex?
  // zIndex: 1,
})

export const SStepperPanel = styled(motion.div, {
  // TODO: Why do we need this overflow here? I'll comment it because we need to show cost tooltips
  // overflow: "hidden",
  position: "relative",

  before: {
    content: "''",
    width: "1px",
    height: "100%",
    backgroundColor: "$system-black",
    position: "absolute",
    left: "26px",
  },
})

export const SStepperContent = styled("div", {
  padding: "$12 $16 $48 $48",
})

export const SStepperButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingY: "$16",
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
  transition: "150ms background",

  hover: {
    backgroundColor: "$neutrals-1",
  },

  disabled: {
    pointerEvents: "none",
  },

  variants: {
    compact: {
      false: {
        paddingX: "$12",
      },
    },
    size: {
      small: { minHeight: "$40" },
      large: { minHeight: "$80" },
    },
  },

  defaultVariants: {
    size: "large",
    compact: "false",
  },
})

export const SStepperItem = styled("div", {
  variants: {
    inactive: {
      true: {
        [`${SStepperButton}`]: {
          opacity: 0.3,
        },
      },
    },
  },
})
