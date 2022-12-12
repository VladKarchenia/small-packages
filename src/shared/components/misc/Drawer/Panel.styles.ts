import { DialogContent } from "@radix-ui/react-dialog"

import { styled } from "@/config"

import { animations } from "@/utils"

export const SDrawerPanel = styled(DialogContent, {
  backgroundColor: "white",
  zIndex: "$9",
  top: 0,
  right: 0,
  bottom: 0,
  width: 400,
  height: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  animation: "400ms cubic-bezier(0.65, 0.05, 0.36, 1) both",

  "&:focus": {
    outline: "none",
  },

  "@lg": {
    width: 500,
  },

  variants: {
    nested: {
      false: { position: "fixed" },
      true: { position: "absolute" },
    },

    scrollable: {
      true: {
        overflowY: "auto",
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },

    direction: {
      left: {
        "&[data-state='open']": {
          animationName: animations.slideIn("left"),
        },

        "&[data-state='closed']": {
          animationName: animations.slideOut("left"),
        },
      },
      right: {
        "&[data-state='open']": {
          animationName: animations.slideIn("right"),
        },

        "&[data-state='closed']": {
          animationName: animations.slideOut("right"),
        },
      },
    },
  },

  defaultVariants: {
    nested: false,
    scrollable: true,
    direction: "right",
  },
})
