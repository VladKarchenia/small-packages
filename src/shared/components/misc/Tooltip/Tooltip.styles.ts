import { styled } from "@/stitches/config"
import { animations, boxShadows } from "@/stitches/utils"

export const STooltipWrapper = styled("div", {
  animation: `${animations.fadeIn} 150ms ease-out`,
  zIndex: "$1",
})

export const STooltip = styled("div", {
  position: "relative",

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
  color: "$neutrals-5",
  borderRadius: "$rounded",
  cursor: "pointer",
  transition: "150ms ease-out",
  outline: "2px solid transparent",

  hover: {
    outline: "2px solid $theme-n2-n7",
    boxShadow: "inset 0 0 0 4px $colors$theme-n2-n7",
  },

  keyboardFocus: {
    outline: "2px solid $theme-vl-n3",
  },

  disabled: {
    pointerEvents: "none",
  },
})

export const STooltipContent = styled("div", {
  width: 260,
  backgroundColor: "$theme-w-n8",
  padding: "$24",
  borderRadius: 0,
  color: "$theme-b-n3",
  boxShadow: boxShadows.tooltip,
  textAlign: "start",
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
    borderTopColor: "$theme-w-n8",
  },

  '&[data-placement*="right"]': {
    top: 0,
    left: 0,
    borderWidth: "$8",
    borderLeft: "none",
    borderRightColor: "$theme-w-n8",
  },

  '&[data-placement*="bottom"]': {
    top: 0,
    borderWidth: "$8",
    borderTop: "none",
    borderBottomColor: "$theme-w-n8",
  },

  '&[data-placement*="left"]': {
    top: 0,
    right: 0,
    borderWidth: "$8",
    borderRight: "none",
    borderLeftColor: "$theme-w-n8",
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
