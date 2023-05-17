import { motion } from "framer-motion"

import { styled } from "@/stitches/config"

export const SStepper = styled("div", {
  paddingBottom: "$40",

  "@sm": {
    paddingBottom: 0,
  },
})

export const SStepperHeader = styled("div", {
  paddingX: "$16",
  position: "relative",

  "@sm": {
    justifySelf: "center",
    paddingX: 0,
  },

  variants: {
    last: {
      true: {},
      false: {
        "@sm": {
          before: {
            content: "''",
            height: "100%",
            borderRight: "1px dashed $theme-b-n3",
            position: "absolute",
            top: 0,
            left: "50%",
            zIndex: "$-1",
          },
        },
      },
    },
  },
})

export const SStepperPanel = styled(motion.div, {
  height: "100%",

  "@max-sm": {
    position: "relative",
  },

  variants: {
    last: {
      true: {},
      false: {
        "@max-sm": {
          before: {
            content: "''",
            height: "100%",
            borderRight: "1px dashed $theme-b-n3",
            position: "absolute",
            // ($24 + $2) - absolute position of the line relative to the parent
            left: `calc($24 + $2)`,
            zIndex: "$-1",
          },
        },
      },
    },
  },
})

export const SStepperContent = styled("div", {
  padding: "$12 $16 $48 $48",

  "@sm": {
    position: "absolute",
    width: "calc(100% - $88)",
    padding: "$8 0 0 $64",
  },
})

export const SStepperButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingY: "$8",
  backgroundColor: "$theme-w-n11",
  color: "$theme-b-n3",
  cursor: "pointer",
  textAlign: "left",
  transition: "150ms ease-out",
  outline: "none",

  "@sm": {
    width: "auto",
    paddingY: "$8",
  },

  hover: {
    color: "$theme-vl-ylr",
  },

  keyboardFocus: {
    color: "$theme-vl-yl",
    textDecoration: "underline",
    textUnderlineOffset: "$space$4",
  },

  active: {
    color: "$theme-vp-yp",
  },

  disabled: {
    color: "$neutrals-5",
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

export const SStepperIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$20",
  minWidth: "$20",
  height: "$20",
  backgroundColor: "$theme-vl-yl",
  color: "$theme-w-n11",
})

export const SStepperItem = styled("div", {
  "@sm": {
    display: "grid",
    gridTemplateColumns: "$88 1fr",
  },

  variants: {
    inactive: {
      true: {
        [`${SStepperPanel}`]: {
          before: {
            borderRightColor: "$neutrals-5",
          },
        },
        [`${SStepperIcon}`]: {
          backgroundColor: "$theme-vlr-ydr",
          color: "$theme-w-n5",
        },
      },
    },
  },
})
