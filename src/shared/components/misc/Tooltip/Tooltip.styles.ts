import { styled } from "@/config"

import { easing, animations } from "@/utils"

export const STooltipWrapper = styled("div", {
  animation: `${animations.fadeIn} 150ms ease-out`,
  zIndex: 1,
})

export const STooltip = styled("div", {
  position: "relative",
  // padding: "$8",

  '&[data-placement="bottom"], &[data-placement="bottom-start"], &[data-placement="bottom-end"]': {
    paddingTop: "$8",
  },

  '&[data-placement="top"], &[data-placement="top-start"], &[data-placement="top-end"]': {
    paddingBottom: "$8",
  },

  '&[data-placement="left"], &[data-placement="left-start"], &[data-placement="left-end"]': {
    paddingRight: "$8",
  },

  '&[data-placement="right"], &[data-placement="right-start"], &[data-placement="right-end"]': {
    paddingLeft: "$8",
  },
})

export const STooltipTrigger = styled("button", {
  reset: true,
  display: "inline-flex",
  color: "inherit",
  cursor: "pointer",
  transition: easing.smooth({ duration: 150, property: "opacity" }),

  hover: {
    opacity: 0.75,
  },

  keyboardFocus: {
    "& > *": {
      outline: "2px solid $neutrals-9",
    },
  },
})

export const STooltipContent = styled("div", {
  backgroundColor: "$brand-yellow-lightest",
  padding: "$24",
})

export const STooltipArrow = styled("div", {
  borderColor: "transparent",
  borderStyle: "solid",
  height: 0,
  width: 0,
  margin: "auto",
  position: "absolute",

  '&[data-placement*="top"]': {
    bottom: 0,
    left: 0,
    borderWidth: "$8",
    borderBottomWidth: 0,
    borderTopColor: "$brand-yellow-lightest",
  },

  '&[data-placement*="right"]': {
    top: 0,
    left: 0,
    borderWidth: "$8",
    borderLeft: 0,
    borderRightColor: "$brand-yellow-lightest",
  },

  '&[data-placement*="bottom"]': {
    top: 0,
    borderWidth: "$8",
    borderTop: 0,
    borderBottomColor: "$brand-yellow-lightest",
  },

  '&[data-placement*="left"]': {
    top: 0,
    right: 0,
    borderWidth: "$8",
    borderRight: 0,
    borderLeftColor: "$brand-yellow-lightest",
  },

  variants: {
    withArrow: {
      true: {
        display: "block",
      },
      false: {
        display: "none",
      },
    },
  },
})
