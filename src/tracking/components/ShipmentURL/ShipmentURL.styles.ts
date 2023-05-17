import { styled } from "@/stitches/config"

export const SShipmentURLButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingY: "$16",
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
  border: "1px solid $theme-n4-n8",
  padding: "$4 $12",
  position: "relative",
  backgroundColor: "transparent",
  color: "$theme-b-yl",
  outline: "1px solid transparent",
  transition: "150ms ease-out",

  disabled: {
    color: "$theme-n4-ydr",
    pointerEvents: "none",
  },

  hover: {
    backgroundColor: "$theme-vlt-ydt",
    color: "$theme-vl-ylr",
    borderColor: "$theme-vl-ylr",
  },

  keyboardFocus: {
    backgroundColor: "$theme-vlr-ydr",
    color: "$theme-vl-yl",
    borderColor: "$theme-vl-n3",
    outline: "1px solid $theme-vl-n3",
  },

  variants: {
    size: {
      small: { minHeight: "$40" },
      large: { minHeight: "$80" },
    },
  },

  defaultVariants: {
    size: "small",
  },
})

export const SShipmentURLMessage = styled("div", {
  height: "$12",
})
