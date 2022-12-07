import { styled } from "@/config"
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
        backgroundColor: "$system-white",
        color: "$system-black",
      },
      black: {
        backgroundColor: "$system-black",
        color: "$system-white",
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
