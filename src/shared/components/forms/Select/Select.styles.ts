import { styled } from "@/config"
import { boxShadows, rgba } from "@/utils"
import { Content, Icon, Item, ItemIndicator, Trigger, Viewport } from "@radix-ui/react-select"

export const SSelectTrigger = styled(Trigger, {
  reset: true,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minHeight: "$48",
  paddingX: "$16",
  paddingY: "$12",
  backgroundColor: "$neutrals-0",
  borderRadius: "$8",
  boxShadow: boxShadows.input.initial,
  transition: "100ms box-shadow ease-out",
  fontFamily: "$sans",
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: ".5px",
  lineHeight: 1.5,
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",
  cursor: "pointer",

  "&:hover, &:focus-within": {
    zIndex: "$1",
  },

  "&:hover": {
    boxShadow: boxShadows.input.hover,
  },

  "&:focus-within": {
    boxShadow: boxShadows.input.focus,
  },

  variants: {
    hasError: {
      false: {},
      true: {
        backgroundColor: "$brand-orange-lightest",
        zIndex: "$1",

        "&, &:hover, &:focus-within": {
          boxShadow: `${boxShadows.input.error} !important`,
        },
      },
    },

    isFocused: {
      false: {},
      true: {
        boxShadow: boxShadows.input.focus,
        zIndex: "$1",
      },
    },
  },
})

export const SSelectIcon = styled(Icon, {
  color: "$neutrals-7",
  width: "$24",
  height: "$24",
})

export const SSelectContent = styled(Content, {
  overflow: "hidden",
  backgroundColor: "$system-white",
  borderRadius: "$8",
  boxShadow: `0 $space$8 $space$24 0 ${rgba("system-black", 0.08)}`,
  width: "100%",
  position: "absolute",
  top: "$0",
  left: "$0",
  zIndex: "$9",
})

export const SSelectViewport = styled(Viewport, {})

export const SSelectItem = styled(Item, {
  backgroundColor: "$system-white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingY: "$12",
  paddingX: "$16",
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",
  cursor: "pointer",

  "&:not(:last-of-type)": {
    borderBottom: "1px solid $neutrals-4",
  },
})

export const SSelectItemIndicator = styled(ItemIndicator, {})
