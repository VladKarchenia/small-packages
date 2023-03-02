import { styled } from "@/stitches/config"

export const SDrawerContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  // ($48 + $12) - Drawer's header height
  height: "calc(100% - ($48 + $12))",
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
