import { styled } from "@/config"

export const SButtonIcon = styled("button", {
  reset: true,
  padding: "$4",
  cursor: "pointer",

  variants: {
    inactive: {
      true: {
        color: "$neutrals-5",
        pointerEvents: "none",
        cursor: "initial",
      },
    },
  },
})
