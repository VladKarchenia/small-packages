import { styled } from "@/stitches/config"

export const SDrawerHeader = styled("header", {
  paddingTop: "$20",
  paddingX: "$16",
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "$32 1fr $32",
  width: "100%",
  backgroundColor: "$theme-w-n11",
  position: "sticky",
  top: 0,
  zIndex: "$2",
  textAlign: "center",

  "@sm": {
    paddingX: "$32",
  },

  "@lg": {
    paddingX: "$48",
  },

  variants: {
    hasSeparator: {
      true: {
        borderBottom: "1px solid $neutrals-5",
      },
    },
  },
})

export const SDrawerCloseButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$32",
  height: "$40",
  color: "$theme-b-n3",
  transition: "200ms ease-out",
  cursor: "pointer",
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",

  hover: {
    outline: "1px solid $theme-b-n3",
  },

  keyboardFocus: {
    outline: "1px solid $theme-b-n3",
  },
})
