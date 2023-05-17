import { styled } from "@/stitches/config"
import { boxShadows } from "@/stitches/utils"

export const SSearchFilterDrawerPreview = styled("button", {
  reset: true,
  display: "grid",
  alignItems: "center",
  gap: "$8",
  width: "100%",
  height: "$48",
  padding: "$12",
  backgroundColor: "$theme-w-n9",
  boxShadow: boxShadows.input.initial,
  color: "$theme-b-n3",
  transition: "100ms ease-out",
  textAlign: "left",
  cursor: "pointer",

  hover: {
    boxShadow: boxShadows.input.hover,
  },

  keyboardFocus: {
    boxShadow: boxShadows.input.focus,
  },

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$theme-n1-n10",
    color: "$theme-n4-n7",
    boxShadow: boxShadows.input.initial,
  },

  variants: {
    withIcon: {
      true: {
        gridTemplateColumns: "$24 1fr $24",
      },
      false: {
        gridTemplateColumns: "1fr $24",
      },
    },
    hasError: {
      true: {
        boxShadow: boxShadows.input.error,

        hover: {
          boxShadow: boxShadows.input.error,
        },

        keyboardFocus: {
          boxShadow: boxShadows.input.error,
        },
      },
    },
  },

  defaultVariants: {
    withIcon: "false",
  },
})
