import { styled, keyframes } from "@/config"

import { rgba } from "@/utils"

const shimmer = keyframes({
  to: { transform: "translateX(100%)" },
})

export const SRedacted = styled("div", {
  position: "relative",
  backgroundColor: "$neutrals-3",
  maxWidth: "100%",
  overflow: "hidden",
  borderRadius: "25px",

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
          backgroundImage: `linear-gradient(90deg, ${rgba("neutrals-0", 0)} 0, ${rgba(
            "neutrals-0",
            0.25,
          )} 20%, ${rgba("neutrals-0", 0.5)} 60%, ${rgba("neutrals-0", 0)})`,
          transform: "translateX(-100%)",
          animation: `${shimmer} 2s infinite`,
        },
      },
    },
  },
})
