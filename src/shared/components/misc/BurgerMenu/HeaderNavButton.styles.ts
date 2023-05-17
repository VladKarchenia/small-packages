import { styled } from "@/stitches/config"
import { rgba, multipleSelectors } from "@/stitches/utils"

export const SHeaderNavButton = styled("button", {
  reset: true,
  alignItems: "center",
  cursor: "pointer",
  display: "inline-flex",
  justifyContent: "center",
  position: "relative",
  transition: "150ms background-color ease-out",

  variants: {
    rounded: {
      true: {
        backgroundColor: rgba("neutrals-0", 0.8),
        borderRadius: "$rounded",
        height: "$40",

        ...multipleSelectors(["hover", "keyboardFocus"], {
          backgroundColor: rgba("neutrals-0", 1),
        }),
      },
      false: {
        height: "100%",
        minWidth: "$32",

        "&::after": {
          backgroundColor: "$brand-yellow-primary",
          bottom: 0,
          content: "''",
          height: "$2",
          left: 0,
          opacity: 0,
          position: "absolute",
          transition: "150ms ease-out",
          width: "100%",
          zIndex: "$-1",
        },

        ...multipleSelectors(["keyboardFocus", "hover"], {
          "&::after": {
            opacity: 1,
          },
        }),
      },
    },
  },
})
