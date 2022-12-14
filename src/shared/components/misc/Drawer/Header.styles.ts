import { styled } from "@/config"

export const SDrawerHeader = styled("header", {
  paddingTop: "$20",
  paddingX: "$16",
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "$32 1fr $32",
  width: "100%",
  backgroundColor: "$neutrals-0",
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
        borderBottom: "1px solid $neutrals-3",
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
  color: "$neutrals-9",
  transition: "200ms ease-out",
  cursor: "pointer",
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",

  hover: {
    color: "$neutrals-7",
  },
})
