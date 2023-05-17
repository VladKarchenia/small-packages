import { styled } from "@/stitches/config"
import { ButtonIcon } from "@/shared/components"

export const SCreateRoundedButton = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  cursor: "pointer",
})

export const SCreateRoundedButtonIcon = styled(ButtonIcon, {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  variants: {
    color: {
      white: {
        backgroundColor: "$neutrals-0",
        color: "$neutrals-11",
      },
      black: {
        backgroundColor: "$theme-b-yl",
        color: "$theme-w-n11",
      },
    },
    size: {
      sm: {
        width: "$32",
        height: "$32",
      },
      lg: {
        width: "$48",
        height: "$48",
      },
    },
  },

  defaultVariants: {
    color: "white",
    size: "sm",
  },
})
