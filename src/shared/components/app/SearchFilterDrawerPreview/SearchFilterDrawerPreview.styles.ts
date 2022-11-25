import { styled } from "@/config"

export const SSearchFilterDrawerPreview = styled("button", {
  reset: true,
  display: "grid",
  textAlign: "left",
  gap: "$8",
  width: "100%",
  alignItems: "center",
  border: "1px solid $neutrals-3",
  paddingX: "$12",
  paddingY: "$12",
  borderRadius: "$8",

  "@md": {
    border: "none",
    width: "auto",
    padding: "$0",
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
  },

  defaultVariants: {
    withIcon: "false",
  },
})
