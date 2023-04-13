import { styled } from "@/stitches/config"

import { HeaderNavButton } from "./HeaderNavButton"

export const SBurgerMenuButton = styled(HeaderNavButton, {
  width: "$40",
  height: "$40",
  backgroundColor: "$theme-n2-n8",
  color: "$theme-b-n3",
  transition: "150ms ease-out",
  outline: "none",

  hover: {
    backgroundColor: "$theme-n4-n7",
    color: "$theme-n7-n3",
  },

  keyboardFocus: {
    backgroundColor: "$theme-n4-n7",
    color: "$theme-n7-n3",
  },

  variants: {
    rounded: {
      true: {
        borderRadius: "$rounded",
      },
    },
  },
})
