import { styled } from "@/stitches/config"

export const SFilterIconBox = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$48",
  height: "$48",
  position: "absolute",
  top: 0,
  right: 0,
  border: "1px solid transparent",

  variants: {
    selected: {
      true: {
        after: {
          backgroundColor: "$theme-vl-yl",
          content: "''",
          width: "$8",
          height: "$8",
          borderRadius: "$rounded",
          position: "absolute",
          top: "$12",
          right: "$12",
        },
      },
    },
  },
})
