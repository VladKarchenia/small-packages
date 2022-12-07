import { styled } from "@/config"

export const SDrawerContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  // 60px here is Drawer's header height
  height: "calc(100% - 60px)",
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
