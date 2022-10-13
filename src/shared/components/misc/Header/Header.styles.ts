import { styled } from "@/config"
import { rgba } from "@/utils"

export const SHeaderNav = styled("header", {
  $$headerBackground: "$colors$system-white",
  $$headerHeight: "$space$56",

  position: "relative",
  zIndex: 5,
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  columnGap: "$16",
  alignItems: "center",
  height: "$$headerHeight",
  width: "100%",
  backgroundColor: "$$headerBackground",
  transition: "150ms ease-out",
  transitionProperty: "background-color, box-shadow",

  "@sm": {
    $$headerHeight: "$space$64",
  },

  variants: {
    hasShadow: {
      false: {
        boxShadow: "none",
      },
      true: {
        boxShadow: `0 2px 10px 0 ${rgba("neutrals-0", 0.1)}`,
      },
    },

    theme: {
      default: {
        $$headerBackground: "$colors$system-white",
      },
      cream: {
        $$headerBackground: "$colors$brand-cream",
      },
      transparent: {
        $$headerBackground: "$colorstransparent",

        "& + *": {
          marginTop: "-$56",

          "@sm": {
            marginTop: "-$64",
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      hasShadow: true,
      theme: "transparent",
      css: {
        boxShadow: "none",
      },
    },
  ],
})
