import { styled } from "@/stitches/config"

export const SAccordionButton = styled("button", {
  reset: true,
  backgroundColor: "$system-white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingY: "$16",
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
  transition: "150ms background",

  hover: {
    backgroundColor: "$neutrals-1",
  },

  disabled: {
    pointerEvents: "none",
  },

  variants: {
    compact: {
      false: {
        paddingX: "$12",
      },
    },
    size: {
      small: { minHeight: "$64" },
      large: { minHeight: "$80" },
    },
  },

  defaultVariants: {
    size: "large",
    compact: "false",
  },
})
