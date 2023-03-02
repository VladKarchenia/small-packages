import { styled } from "@/stitches/config"

import { rgba } from "@/stitches/utils"

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
  borderRadius: "$8",

  focus: {
    boxShadow: `0 $space$4 $space$12 0 ${rgba("neutrals-5", 0.5)}`,
  },

  disabled: {
    backgroundColor: "$neutrals-6",
    borderColor: "transparent",
    color: "$system-white",
    boxShadow: "none",
    pointerEvents: "none",
  },

  variants: {
    action: {
      primary: {
        backgroundColor: "$system-black",
        borderColor: "transparent",
        color: "$system-white",

        hover: {
          backgroundColor: "$neutrals-7",
          borderColor: "transparent",
        },

        active: {
          backgroundColor: "$neutrals-5",
          borderColor: "transparent",
        },
      },
      secondary: {
        backgroundColor: "$system-white",
        borderColor: "$system-black",
        color: "$neutrals-9",

        hover: {
          backgroundColor: "$system-white",
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
        borderRadius: "$pill",
      },
    },

    loading: {
      true: {
        backgroundColor: "$neutrals-6",
        borderColor: "transparent",
        color: "$system-white",
        boxShadow: "none",
        pointerEvents: "none",

        hover: {
          backgroundColor: "$neutrals-6",
        },
      },
    },

    full: {
      false: { width: "auto" },
      true: { width: "100%" },
    },
  },

  defaultVariants: {
    action: "primary",
    size: "small",
  },
})

export const SButtonSpinner = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  right: "-$32",
  top: "50%",
  transform: "translateY(-50%)",
})

export const SButtonIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$24",
  width: "$24",
})
