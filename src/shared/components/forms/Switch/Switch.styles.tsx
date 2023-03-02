import { styled } from "@/stitches/config"

export const SSwitch = styled("div", {
  display: "flex",
  position: "relative",
  top: 1,
  right: "$2",
  zIndex: "$1",
  backgroundColor: "$neutrals-3",
  borderRadius: "$pill",

  variants: {
    checked: {
      true: {
        backgroundColor: "$neutrals-5",
      },
    },
  },
})
