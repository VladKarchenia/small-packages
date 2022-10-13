import { styled } from "@/config";
import { rgba, multipleSelectors } from "@/utils";

export const SHeaderNavButton = styled("button", {
  reset: true,
  alignItems: "center",
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: "$sans",
  fontWeight: 500,
  justifyContent: "center",
  paddingX: "$16",
  marginRight: "$16",
  position: "relative",
  transition: "150ms background-color ease-out",

  variants: {
    rounded: {
      true: {
        backgroundColor: rgba("system-white", 0.8),
        borderRadius: "$pill",
        height: "$40",

        ...multipleSelectors(["hover", "keyboardFocus"], {
          backgroundColor: rgba("system-white", 1),
        }),

        active: {
          backgroundColor: "$neutrals-3",
        },
      },
      false: {
        height: "100%",
        minWidth: "$32",

        "&::after": {
          backgroundColor: "$brand-yellow-primary",
          bottom: 0,
          content: "''",
          height: 2,
          left: 0,
          opacity: 0,
          position: "absolute",
          transition: "150ms ease-out",
          width: "100%",
          zIndex: -1,
        },

        ...multipleSelectors(["keyboardFocus", "hover"], {
          "&::after": {
            opacity: 1,
          },
        }),
      },
    },
  },
});
