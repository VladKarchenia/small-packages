import { styled } from "@/config"

export const SShipmentURLButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingY: "$16",
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
  transition: "150ms background",

  border: "1px solid $neutrals-4",
  borderRadius: "$8",
  padding: "$4 $12",

  position: "relative",

  disabled: {
    pointerEvents: "none",
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
