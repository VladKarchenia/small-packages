import { styled } from "@/stitches/config"

export const SButtonIcon = styled("button", {
  reset: true,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "$4",
  color: "$theme-b-n3",
  cursor: "pointer",
  outline: "1px solid transparent",

  keyboardFocus: {
    outline: "1px solid $theme-vl-n3",
  },

  disabled: {
    color: "$theme-n4-n7",
    pointerEvents: "none",
    cursor: "initial",
  },

  "@sm": {
    hover: {
      backgroundColor: "$theme-n2-n8",
    },
  },

  variants: {
    inputIcon: {
      true: {
        padding: "$2",

        hover: {
          backgroundColor: "initial",
          color: "$theme-n6-n5",
        },
      },
    },
  },
})
