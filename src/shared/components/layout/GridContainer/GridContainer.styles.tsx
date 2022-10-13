import { styled } from "@/config";

export const SGridContainer = styled("div", {
  maxWidth: "1920px",
  width: "100%",
  marginX: "auto",

  variants: {
    fullBleed: {
      true: { paddingX: 0 },
      false: {
        paddingX: "$24",

        "@xs": {
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
});
