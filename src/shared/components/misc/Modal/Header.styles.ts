import { styled } from "@/stitches/config"

export const SModalHeader = styled("header", {
  zIndex: "$2",
  top: "-$$modalContentYPadding",
  marginTop: "-$$modalContentYPadding",
  marginX: "-$$modalContentXPadding",
  marginBottom: "$$modalContentYPadding",

  variants: {
    empty: {
      false: {
        backgroundColor: "$theme-w-n11",
        padding: "$16 $24",
        borderBottom: "1px solid $neutrals-4",

        "@sm": {
          paddingY: "$24",
        },
      },
    },

    sticky: {
      false: { position: "relative" },
      true: { position: "sticky" },
    },
  },
})
