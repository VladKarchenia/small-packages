import { styled, keyframes } from "@/stitches/config"

import { rgba } from "@/stitches/utils"

const shimmer = keyframes({
  to: { transform: "translateX(100%)" },
})

export const SRedacted = styled("div", {
  position: "relative",
  backgroundColor: "$neutrals-3",
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
          backgroundImage: `linear-gradient(90deg, ${rgba("system-white", 0)} 0, ${rgba(
            "system-white",
            0.25,
          )} 20%, ${rgba("system-white", 0.5)} 60%, ${rgba("system-white", 0)})`,
          transform: "translateX(-100%)",
          animation: `${shimmer} 2s infinite`,
        },
      },
    },
  },
})
