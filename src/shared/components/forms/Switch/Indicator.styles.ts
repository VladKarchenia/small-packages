import { styled } from "@/stitches/config"
import { easing, rgba } from "@/stitches/utils"

export const SSwitchIndicator = styled("div", {
  position: "absolute",
  top: "-$2",
  zIndex: "-$1",
  width: "$20",
  height: "$20",
  backgroundColor: "$system-white",
  borderRadius: "$rounded",
  boxShadow: `0 $space$2 $space$8 ${rgba("system-black", 0.2)}`,
  transition: easing.smooth({
    property: "transform",
    duration: 200,
  }),

  variants: {
    checked: {
      true: {
        backgroundColor: "$system-black",
        transform: "translateX($16)",
      },
      false: {
        transform: "translateX(-$4)",
      },
    },
  },
})
