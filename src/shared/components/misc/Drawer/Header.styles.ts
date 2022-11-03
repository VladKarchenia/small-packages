import { styled } from "@/config"

export const SDrawerHeader = styled("header", {
  paddingX: "$24",
  height: "$56",
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "$32 1fr $32",
  width: "100%",
  backgroundColor: "$neutrals-0",
  position: "sticky",
  top: 0,
  zIndex: "$2",

  "@sm": {
    paddingX: "$32",
    height: "$64",
  },

  "@lg": {
    paddingX: "$48",
    height: "$80",
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
  height: "$32",
  color: "$neutrals-9",
  transition: "200ms ease-out",
  cursor: "pointer",

  hover: {
    color: "$neutrals-7",
  },
})
