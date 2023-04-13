import { styled } from "@/stitches/config"

export const SPill = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  backgroundColor: "$theme-vlt-ydt",
  color: "$theme-b-n3",
  border: "1px solid $theme-vl-yl",
  cursor: "pointer",
  outline: "1px solid transparent",
  outlineOffset: "$space$2",
  transition: "100ms ease-out",

  "@supportsHover": {
    hover: {
      backgroundColor: "$theme-vlr-ydr",
    },
  },

  keyboardFocus: {
    outline: "1px solid $theme-vl-n3",
  },

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$theme-n1-n10",
    color: "$theme-n4-n7",
  },

  variants: {
    selected: {
      true: {},
    },

    active: {
      true: {
        "@supportsHover": {
          hover: {},
        },
      },
    },

    size: {
      small: { height: "$24", paddingX: "$12" },
      medium: { height: "$32", paddingX: "$16" },
      large: { height: "$40", paddingX: "$20" },
    },
  },

  compoundVariants: [
    {
      selected: true,
      active: true,
      css: {},
    },
  ],

  defaultVariants: {
    size: "small",
  },
})

export const SSelectedDot = styled("div", {
  height: "$8",
  width: "$8",
  borderRadius: "$rounded",
  backgroundColor: "$brand-yellow-dark",
  marginLeft: "$8",
  marginTop: "$2",
})
