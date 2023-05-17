import { styled } from "@/stitches/config"

import { Text } from "../Text"

export const STitle = styled("h1", Text, {
  fontSmoothing: true,

  variants: {
    fontWeight: {
      regular: { fontWeight: 400 },
      medium: { fontWeight: 500 },
      semiBold: { fontWeight: 600 },
      bold: { fontWeight: 700 },
      black: { fontWeight: 900 },
    },
  },

  defaultVariants: {
    fontWeight: "bold",
  },
})
