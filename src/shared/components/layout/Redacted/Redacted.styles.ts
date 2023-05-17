import { styled, keyframes } from "@/stitches/config"

import { rgba } from "@/stitches/utils"

const shimmer = keyframes({
  to: { transform: "translateX(100%)" },
})

export const SRedacted = styled("div", {
  position: "relative",
  backgroundColor: "$theme-n2-n9",
  maxWidth: "100%",
  overflow: "hidden",

  variants: {
    animated: {
      true: {
        "&::after": {
          content: "''",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `linear-gradient(90deg, ${rgba("theme-w-b", 0)} 0, ${rgba(
            "theme-w-b",
            0.25,
          )} 20%, ${rgba("theme-w-b", 0.1)} 60%, ${rgba("theme-w-b", 0)})`,
          transform: "translateX(-100%)",
          animation: `${shimmer} 2s infinite`,
        },
      },
    },
  },
})
