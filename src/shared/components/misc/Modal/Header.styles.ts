import { styled } from "@/config"

export const SModalHeader = styled("header", {
  zIndex: "$2",
  top: "-$$modalContentYPadding",
  marginTop: "-$$modalContentYPadding",
  marginX: "-$$modalContentXPadding",
  marginBottom: "$$modalContentYPadding",

  variants: {
    empty: {
      false: {
        backgroundColor: "$neutrals-0",
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
