import { styled } from "@/config"

export const SFormRadioGroup = styled("div", {
  variants: {
    withCells: {
      true: {
        display: "grid",
        columnGap: "$16",
        rowGap: "$16",
        gridTemplateColumns: "1fr",

        "@sm": {
          gridTemplateColumns: "1fr 1fr",
        },
      },
    },
  },
})
