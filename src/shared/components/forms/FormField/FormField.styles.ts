import { styled } from "@/stitches/config"
import { boxShadows } from "@/stitches/utils"

export const SFormField = styled("div", {
  width: "100%",
  variants: {
    disabled: {
      true: { cursor: "not-allowed" },
    },
  },
})

export const SFormFieldContainer = styled("label", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: "$system-white",
  borderRadius: "$8",
  boxShadow: boxShadows.input.initial,
  transition: "100ms box-shadow ease-out",

  "&:hover, &:focus-within": {
    zIndex: "$1",
  },

  "&:hover": {
    boxShadow: boxShadows.input.hover,
  },

  "&:focus-within": {
    boxShadow: boxShadows.input.focus,
  },

  variants: {
    hasError: {
      false: {},
      true: {
        backgroundColor: "$brand-orange-lightest",
        zIndex: "$1",

        "&, &:hover, &:focus-within": {
          boxShadow: `${boxShadows.input.error} !important`,
        },
      },
    },

    isFocused: {
      false: {},
      true: {
        boxShadow: boxShadows.input.focus,
        zIndex: "$1",
      },
    },

    isDisabled: {
      false: {},
      true: {
        "&:hover": {
          boxShadow: boxShadows.input.initial,
        },

        "&:focus-within": {
          boxShadow: boxShadows.input.initial,
        },
      },
    },

    borderless: {
      false: {},
      true: {
        boxShadow: "none",

        "&:hover": {
          boxShadow: "none",
        },

        "&:focus-within": {
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

        "&, &:hover, &:focus-within": {
          boxShadow: "none !important",
        },
      },
    },
  ],
})

export const SFormFieldElement = styled("input", {
  position: "relative",
  display: "block",
  appearance: "none",
  "-webkit-appearance": "none",
  outline: "none",
  background: "none",
  border: "none",
  width: "100%",
  paddingX: "$16",
  paddingY: "$12",
  color: "$neutrals-9",
  minHeight: "$48",
  flex: 1,
  marginTop: 0,
  marginBottom: 0,
  borderRadius: "$8",

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

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$neutrals-1",
    color: "$neutrals-7",
  },

  "&[readonly]:not([disabled])": {
    placeholder: {
      color: "$neutrals-9",
    },
  },

  variants: {
    large: {
      true: {
        fontSize: 20,
      },
    },

    isPlaceholder: {
      true: {
        backgroundColor: "$neutrals-1",
        pointerEvents: "none",
      },
    },

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

export const SFormFieldPrefix = styled("span", {
  zIndex: "$1",
  position: "absolute",
  left: "$16",
})

export const SFormFieldSuffix = styled("span", {
  zIndex: "$1",
  position: "absolute",
  right: "$16",
})
