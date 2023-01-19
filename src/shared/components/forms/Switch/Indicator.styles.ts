import { styled } from "@/config"

import { easing, rgba } from "@/utils"

export const SSwitchIndicator = styled("div", {
  position: "absolute",
  top: "-$2",
  zIndex: "-$1",
  width: "$20",
  height: "$20",
  backgroundColor: "$system-white",
  borderRadius: "$rounded",
  boxShadow: `0px 2px 8px ${rgba("system-black", 0.2)}`,
  transition: easing.smooth({
    property: "transform",
    duration: 200,
  }),

  variants: {
    checked: {
      true: {
        backgroundColor: "$system-black",
      },
    },
  },
})
