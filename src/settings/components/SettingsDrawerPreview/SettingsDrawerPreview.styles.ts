import { styled } from "@/stitches/config"

export const SSettingsDrawerPreview = styled("button", {
  reset: true,
  display: "grid",
  textAlign: "left",
  gap: "$8",
  width: "100%",
  alignItems: "center",
  borderBottom: "1px solid $neutrals-5",
  paddingBottom: "$16",
  borderRadius: 0,
  color: "$theme-b-n3",
  outline: "none",

  "@sm": {
    hover: {
      outline: "1px solid $theme-b-n3",
    },
  },

  keyboardFocus: {
    outline: "1px solid $theme-b-n3",
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
