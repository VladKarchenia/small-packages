import { DialogContent } from "@radix-ui/react-dialog"

import { styled } from "@/stitches/config"
import { animations } from "@/stitches/utils"

export const SDrawerPanel = styled(DialogContent, {
  backgroundColor: "$theme-w-n11",
  zIndex: "$9",
  top: 0,
  right: 0,
  bottom: 0,
  width: 400,
  height: "100%",
  maxWidth: "100%",
  overflow: "auto",
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
    scrollable: false,
    direction: "right",
  },
})
