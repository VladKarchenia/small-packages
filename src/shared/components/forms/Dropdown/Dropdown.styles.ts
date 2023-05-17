import { keyframes, styled } from "@/stitches/config"
import { boxShadows, multipleSelectors } from "@/stitches/utils"
import {
  CheckboxItem,
  Content,
  Item,
  ItemIndicator,
  Label,
  RadioGroup,
  RadioItem,
  Trigger,
} from "@radix-ui/react-dropdown-menu"

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
  "0%": { opacity: 0, transform: "translateX(2$)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

export const SDropdownMenuContent = styled(Content, {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "max-content",
  backgroundColor: "$theme-w-n10",
  borderRadius: 0,
  marginY: "$12",
  paddingY: 0,
  boxShadow: boxShadows.dropdown,
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

export const SDropdownMenuTrigger = styled(Trigger, {
  all: "unset",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  position: "relative",
})

export const SDropdownMenuItem = styled(Item, {
  all: "unset",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "$40",
  backgroundColor: "transparent",
  position: "relative",
  cursor: "pointer",
  transition: "150ms background-color ease-out",

  ...multipleSelectors(["hover", "keyboardFocus"], {
    backgroundColor: "$theme-n2-n7",
  }),
})

export const SDropdownMenuRadioGroup = styled(RadioGroup, {
  all: "unset",
  userSelect: "none",
  width: "100%",
  minWidth: "$192",
})

export const SDropdownMenuRadioItem = styled(RadioItem, {
  all: "unset",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  height: "$40",
  cursor: "pointer",
  transition: "150ms background-color ease-out",

  ...multipleSelectors(["hover", "keyboardFocus"], {
    backgroundColor: "$neutrals-1",
  }),
})

export const SDropdownMenuCheckboxItem = styled(CheckboxItem, {
  all: "unset",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  height: "$40",
  cursor: "pointer",
  transition: "150ms background-color ease-out",

  ...multipleSelectors(["hover", "keyboardFocus"], {
    backgroundColor: "$neutrals-1",
  }),
})

export const SDropdownMenuItemIndicator = styled(ItemIndicator, {
  all: "unset",
  userSelect: "none",
  paddingRight: "$16",
})

export const SDropdownMenuLabel = styled(Label, {
  width: "100%",
})
