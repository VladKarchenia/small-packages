import { styled } from "@/config"
import { rgba, multipleSelectors } from "@/utils"
import { HeaderNavButton } from "./HeaderNavButton"

export const SBurgerMenuButton = styled(HeaderNavButton, {
  $$backgroundColor: "transparent",
  backgroundColor: "$$backgroundColor",
  width: "$40",
  height: "$40",

  variants: {
    theme: {
      default: {
        $$backgroundColor: "$colors$system-white",

        ...multipleSelectors(["keyboardFocus", "hover"], {
          $$backgroundColor: "$colors$neutrals-2",
        }),
      },

      transparent: {
        $$backgroundColor: rgba("system-white", 0.8),

        ...multipleSelectors(["keyboardFocus", "hover"], {
          $$backgroundColor: "$colors$system-white",
        }),
      },

      cream: {
        ...multipleSelectors(["keyboardFocus", "hover"], {
          $$backgroundColor: rgba("system-black", 0.05),
        }),
      },
    },

    rounded: {
      true: {
        borderRadius: "$pill",
      },
    },
  },
})
