import { styled } from "@/config"
import { boxShadows } from "@/utils/styles"

export const SFormField = styled("div", {
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
  backgroundColor: "$neutrals-0",
  borderRadius: "$2",
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
  },
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
  fontFamily: "$sans",
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: ".5px",
  lineHeight: 1.5,
  flex: 1,
  marginTop: 0,
  marginBottom: 0,

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
  },
})

export const SFormFieldPrefix = styled("span", {
  paddingLeft: "$16",
  marginRight: "-$8",
  zIndex: "$1",
})

export const SFormFieldSuffix = styled("span", {
  padding: "0 $8",
  zIndex: "$1",
})
