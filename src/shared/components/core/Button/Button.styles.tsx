import { styled } from "@/config"

import { rgba } from "@/utils"

export const SButton = styled("button", {
  reset: true,
  border: "1px solid transparent",
  paddingY: "$8",
  paddingX: "$16",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "150ms ease-out",
  cursor: "pointer",

  focus: {
    boxShadow: `0 4px 12px 0 ${rgba("neutrals-5", 0.5)}`,
  },

  disabled: {
    backgroundColor: "$neutrals-2",
    borderColor: "transparent",
    color: "$neutrals-5",
    boxShadow: "none",
    pointerEvents: "none",
  },

  variants: {
    action: {
      primary: {
        backgroundColor: "$brand-yellow-primary",
        borderColor: "transparent",
        color: "$neutrals-9",

        hover: {
          backgroundColor: "$brand-yellow-light",
          borderColor: "transparent",
        },

        active: {
          backgroundColor: "$brand-yellow-lighter",
          borderColor: "transparent",
        },
      },
      secondary: {
        backgroundColor: "$neutrals-0",
        borderColor: "$neutrals-5",
        color: "$neutrals-9",

        hover: {
          backgroundColor: "$neutrals-0",
          borderColor: "$neutrals-9",
        },

        active: {
          backgroundColor: "$neutrals-3",
          borderColor: "$neutrals-9",
        },
      },
    },

    size: {
      small: { height: "$48" },
      medium: { height: "$56" },
      large: { height: "$80" },
    },

    rounded: {
      true: {
        paddingX: "$20",
        height: "$48",
        borderRadius: "9999px",
      },
    },

    loading: {
      true: {
        pointerEvents: "none",
      },
    },

    full: {
      false: { width: "auto" },
      true: { width: "100%" },
    },
  },

  defaultVariants: {
    action: "primary",
    size: "medium",
  },
})

export const SButtonSpinner = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  "& ~ *": {
    transition: "150ms opacity ease-out",
    opacity: 0,
  },
})

export const SButtonIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "$4",
  marginRight: "-$4",
  height: "$24",
  width: "$24",

  "@sm": {
    marginLeft: "$8",
    marginRight: "-$8",
  },

  svg: {
    display: "block",
  },

  variants: {
    float: {
      true: {
        position: "absolute",
        top: "50%",
        right: "$16",
        transform: "translateY(-50%)",
        margin: 0,
      },
    },
  },
})
