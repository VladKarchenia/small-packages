import { styled } from "@/stitches/config"

export const SSearchFilterDrawerPreview = styled("button", {
  reset: true,
  display: "grid",
  textAlign: "left",
  gap: "$8",
  width: "100%",
  height: "$48",
  alignItems: "center",
  border: "1px solid $neutrals-3",
  paddingX: "$12",
  paddingY: "$12",
  borderRadius: "$8",

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
