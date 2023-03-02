import { styled } from "@/stitches/config"

export const SGridContainer = styled("div", {
  maxWidth: 1920,
  width: "100%",
  marginX: "auto",

  variants: {
    fullBleed: {
      true: { paddingX: 0 },
      false: {
        paddingX: "$16",

        "@sm": {
          paddingX: "$32",
        },
      },
    },
    compact: {
      true: {
        paddingX: "$16",
        "@xs": {
          paddingX: "$24",
        },
      },
    },
  },

  defaultVariants: {
    fullBleed: "false",
  },
})
