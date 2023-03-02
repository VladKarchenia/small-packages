import { styled } from "@/stitches/config"

export const SProfileDrawerPreview = styled("button", {
  reset: true,
  display: "grid",
  textAlign: "left",
  gap: "$8",
  width: "100%",
  alignItems: "center",
  borderBottom: "1px solid $neutrals-3",
  paddingBottom: "$16",
  borderRadius: 0,

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
