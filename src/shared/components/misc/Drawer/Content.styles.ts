import { styled } from "@/config"

export const SDrawerContent = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "$48 $24",

  focus: {
    outline: "none",
  },

  "@xs": {
    paddingX: "$32",
  },

  "@lg": {
    padding: "$64 $48",
  },

  variants: {
    noPadding: {
      true: { padding: 0 },
    },
  },
})
