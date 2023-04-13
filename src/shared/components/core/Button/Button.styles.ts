import { styled } from "@/stitches/config"

export const SButton = styled("button", {
  reset: true,
  border: "1px solid transparent",
  paddingY: "$8",
  paddingX: "$16",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "150ms ease-out",
  cursor: "pointer",
  borderRadius: 0,
  outline: "2px solid transparent",

  disabled: {
    boxShadow: "none",
    pointerEvents: "none",
  },

  variants: {
    size: {
      small: { height: "$48" },
      medium: { height: "$56" },
      large: { height: "$64" },
    },

    full: {
      false: { width: "auto" },
      true: { width: "100%" },
    },

    action: {
      primary: {
        backgroundColor: "$theme-b-yl",
        color: "$theme-w-n11",

        hover: {
          backgroundColor: "$theme-b-ylr",
          color: "$theme-vl-n11",
        },

        keyboardFocus: {
          backgroundColor: "$theme-b-yl",
          color: "$theme-vl-n11",
          borderColor: "$theme-vl-n3",
          outline: "2px solid $theme-vl-n3",
        },

        active: {
          backgroundColor: "$theme-b-yp",
          color: "$theme-vp-n11",
        },

        disabled: {
          backgroundColor: "$theme-n4-ydr",
        },
      },
      secondary: {
        backgroundColor: "transparent",
        color: "$theme-b-yl",
        borderColor: "$theme-b-yl",

        hover: {
          backgroundColor: "$theme-vlt-ydt",
          color: "$theme-vl-ylr",
          borderColor: "$theme-vl-ylr",
        },

        keyboardFocus: {
          backgroundColor: "$theme-vlr-ydr",
          color: "$theme-vl-yl",
          borderColor: "$theme-vl-n3",
          outline: "2px solid $theme-vl-n3",
        },

        active: {
          backgroundColor: "$theme-vlt-ydt",
          color: "$theme-vp-yp",
          borderColor: "$theme-vp-yp",
        },

        disabled: {
          color: "$theme-n4-ydr",
          borderColor: "$theme-n4-ydr",
        },
      },
      text: {
        height: "auto",
        padding: "$0",
        color: "$theme-b-yl",
        outline: "none",

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
          color: "$theme-n4-ydr",
        },
      },
    },
  },

  defaultVariants: {
    action: "primary",
    size: "small",
  },
})

export const SButtonSpinner = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  right: "-$32",
  top: "50%",
  transform: "translateY(-50%)",
})

export const SButtonIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$24",
  width: "$24",
})
