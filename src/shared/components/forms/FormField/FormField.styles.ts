import { styled } from "@/stitches/config"
import { boxShadows } from "@/stitches/utils"

export const SFormField = styled("div", {
  width: "100%",
  variants: {
    disabled: {
      true: { cursor: "not-allowed", pointerEvents: "none" },
    },
  },
})

export const SFormFieldPrefix = styled("span", {
  display: "inline-flex",
  zIndex: "$1",
  position: "absolute",
  left: "$16",
  color: "$theme-b-n3",
})

export const SFormFieldSuffix = styled("span", {
  display: "inline-flex",
  zIndex: "$1",
  position: "absolute",
  right: "$16",
  color: "$theme-b-n3",
})

export const SFormFieldElement = styled("input", {
  display: "block",
  flex: 1,
  width: "100%",
  minHeight: "$48",
  paddingX: "$16",
  paddingY: "$12",
  marginY: 0,
  background: "none",
  border: "none",
  color: "$theme-b-n3",
  position: "relative",
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",

  placeholder: {
    color: "$neutrals-5",
    opacity: 1,
  },

  "&::-ms-reveal, &::-ms-clear": {
    display: "none",
  },

  "&[type=number]": {
    // Firefox only
    "-moz-appearance": "textfield",

    // Chrome, Safari and Opera
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
    },
  },

  // trick to delay Chrome background-color and text color autofill styles
  "&:-webkit-autofill": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$theme-n1-n10",
    color: "$theme-n4-n7",
    boxShadow: boxShadows.input.initial,

    placeholder: {
      color: "$theme-n4-n7",
    },

    [`${SFormFieldPrefix}`]: {
      color: "$theme-n4-n7",
    },

    [`${SFormFieldSuffix}`]: {
      color: "$theme-n4-n7",
    },
  },

  "&[readonly]:not([disabled])": {
    placeholder: {
      color: "$neutrals-5",
    },
  },

  variants: {
    isClickable: {
      true: { cursor: "pointer" },
    },

    hasPrefix: {
      true: {
        paddingLeft: "$48",
      },
    },

    hasSuffix: {
      true: {
        paddingRight: "$48",
      },
    },

    borderless: {
      true: {
        paddingX: 0,
      },
    },
  },
})

export const SFormFieldContainer = styled("label", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: "$theme-w-n9",
  boxShadow: boxShadows.input.initial,
  transition: "100ms ease-out",
  zIndex: "$1",

  "&:hover": {
    boxShadow: boxShadows.input.hover,
  },

  "&:focus, &:focus-within": {
    boxShadow: boxShadows.input.focus,
  },

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$theme-n1-n10",
    color: "$theme-n4-n7",
    boxShadow: boxShadows.input.initial,
  },

  variants: {
    hasError: {
      true: {
        "&, &:hover, &:focus, &:focus-within": {
          boxShadow: boxShadows.input.error,
        },
      },
    },

    borderless: {
      true: {
        backgroundColor: "initial",
        boxShadow: "none",

        "&:hover, &:focus, &:focus-within": {
          boxShadow: "none",
        },
      },
    },
  },

  compoundVariants: [
    {
      hasError: true,
      borderless: true,
      css: {
        backgroundColor: "initial",

        "&, &:hover, &:focus, &:focus-within": {
          boxShadow: "none !important",
        },
      },
    },
  ],
})
