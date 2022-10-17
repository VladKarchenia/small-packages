import { styled } from "@/config"
import { rgba } from "@/utils"

import { SModalCloseButton } from "./CloseButton.styles"

export const SModalContent = styled("div", {
  $$modalContentXPadding: "0px",
  $$modalContentYPadding: "0px",

  position: "relative",
  boxShadow: `0 2px 16px 0 ${rgba("neutrals-9", 0.15)}`,
  maxHeight: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  backgroundColor: "$neutrals-0",
  padding: "$$modalContentYPadding $$modalContentXPadding",

  variants: {
    scrollable: {
      true: {
        overflowY: "auto",
      },
    },

    size: {
      xs: {
        width: 340,
        height: "auto",
        minHeight: "auto",
        borderRadius: 32,
      },

      sm: {
        borderRadius: 4,
        minHeight: "auto",
        width: 420,
      },

      md: {
        minHeight: "100%",

        [`${SModalCloseButton}`]: {
          top: "$16",
          right: "$16",
        },

        "@sm": {
          borderRadius: 32,
          minHeight: "auto",
          width: 560,
        },
      },

      lg: {
        minHeight: "100%",

        [`${SModalCloseButton}`]: {
          top: "$16",
          right: "$16",
        },

        "@sm": {
          borderRadius: 32,
          minHeight: "auto",
          width: 680,
        },
      },
    },

    hasGutter: {
      true: {},
    },

    theme: {
      white: { backgroundColor: "$neutrals-0" },
      cream: { backgroundColor: "$brand-cream-primary" },
    },
  },

  compoundVariants: [
    {
      size: "xs",
      hasGutter: "true",
      css: {
        $$modalContentXPadding: "$space$24",
        $$modalContentYPadding: "$space$32",
      },
    },
    {
      size: "sm",
      hasGutter: "true",
      css: {
        $$modalContentXPadding: "$space$24",
        $$modalContentYPadding: "$space$40",
      },
    },
    {
      size: "md",
      hasGutter: "true",
      css: {
        $$modalContentXPadding: "$space$24",
        $$modalContentYPadding: "$space$40",

        "@sm": {
          $$modalContentXPadding: "$space$32",
        },
      },
    },
    {
      size: "lg",
      hasGutter: "true",
      css: {
        $$modalContentXPadding: "$space$24",
        $$modalContentYPadding: "$space$40",

        "@sm": {
          $$modalContentXPadding: "$space$32",
        },
      },
    },
  ],

  defaultVariants: {
    hasGutter: true,
    scrollable: true,

    size: "md",
    theme: "white",
  },
})
