import { styled } from "@/stitches/config"
import { boxShadows } from "@/stitches/utils"

import { SModalCloseButton } from "./CloseButton.styles"

export const SModalContent = styled("div", {
  $$modalContentXPadding: 0,
  $$modalContentYPadding: 0,

  position: "relative",
  boxShadow: boxShadows.modal,
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
        borderRadius: "$4",
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

      dimensionless: {
        minHeight: "100%",
      },
    },

    hasGutter: {
      true: {},
    },

    theme: {
      white: { backgroundColor: "$neutrals-0" },
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
