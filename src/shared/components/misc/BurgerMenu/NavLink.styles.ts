import { styled } from "@/config";
import { multipleSelectors, easing } from "@/utils";

export const SNavLink = styled("a", {
  $$color: "$colors$neutrals-7",
  color: "$$color",
  display: "inline-block",
  position: "relative",
  textDecoration: "none",

  ...multipleSelectors(["keyboardFocus", "hover"], {
    after: {
      transform: "scaleX(1)",
    },
  }),

  after: {
    background: "$brand-yellow-primary",
    bottom: "-$4",
    content: "''",
    display: "block",
    height: 2,
    position: "absolute",
    transformOrigin: "left",
    transform: "scaleX(0)",
    transition: easing.smooth({
      duration: 300,
      property: "transform",
    }),
    width: "100%",
  },

  variants: {
    selected: {
      true: {
        $$color: "$color$neutrals-9",

        after: {
          transform: "scaleX(1)",
        },
      },
    },
    role: {
      guest: {
        $$color: "$colors$neutrals-9",
      },
      host: {
        $$color: "$colors$neutrals-9",
      },
    },
  },
});
