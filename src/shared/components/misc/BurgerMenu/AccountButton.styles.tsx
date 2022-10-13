import { styled } from "@/config"
import { rgba, multipleSelectors } from "@/utils"
import { HeaderNavButton } from "./HeaderNavButton"

export const SAccountButton = styled(HeaderNavButton, {
  $$backgroundColor: "transparent",
  backgroundColor: "$$backgroundColor",
  height: "$40",
  paddingLeft: "$8",
  paddingRight: "$4",
  width: "auto",

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
