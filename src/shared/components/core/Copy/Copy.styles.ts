import { styled } from "@/stitches/config"

import { Text } from "../Text"

export const SCopy = styled("p", Text, {
  fontSmoothing: true,

  variants: {
    fontWeight: {
      regular: { fontWeight: 400 },
      medium: { fontWeight: 500 },
      semiBold: { fontWeight: 600 },
      bold: { fontWeight: 700 },
      black: { fontWeight: 900 },
    },

    uppercase: {
      true: { textTransform: "uppercase" },
      false: { textTransform: "initial" },
    },

    truncate: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  },

  defaultVariants: {
    fontWeight: "regular",
    uppercase: "false",
  },
})
