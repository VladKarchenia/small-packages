import { styled } from "@/config"

import { Text } from "../Text"

export const SCopy = styled("p", Text, {
  fontSmoothing: true,

  variants: {
    bold: {
      true: { fontWeight: 500 },
      false: { fontWeight: 400 },
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
    bold: "false",
    uppercase: "false",
  },
})
