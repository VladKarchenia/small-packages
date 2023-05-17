import { styled } from "@/stitches/config"

import { IconTick, IconMinus } from "@/shared/icons"

export const SFormCheckboxLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  cursor: "pointer",

  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
        cursor: "default",
      },
    },
  },
})

export const SFormCheckboxBox = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "none",
  width: "$24",
  height: "$24",
  backgroundColor: "transparent",
  border: "1px solid $neutrals-5",
  transition: "150ms ease-out",
  cursor: "pointer",
  outline: "2px solid transparent",
  outlineOffset: "$space$4",
})

export const SFormCheckboxTick = styled(IconTick, {
  opacity: 0,
  color: "$theme-w-n9",
  transform: "rotate(90deg)",
  transition: "150ms ease-out",
})

export const SFormCheckboxHyphen = styled(IconMinus, {
  opacity: 0,
  color: "$theme-w-n9",
  transform: "rotate(0deg)",
  transition: "150ms ease-out",
})

export const SFormCheckboxInput = styled("input", {
  hiddenInput: true,
  position: "relative",
  width: 0,
  height: 0,
  margin: 0,

  hover: {
    [`+ ${SFormCheckboxBox}`]: {
      borderColor: "$theme-n6-n5",
      boxShadow: "0 0 0 3px $colors$theme-n2-n7",
    },
  },

  keyboardFocus: {
    [`+ ${SFormCheckboxBox}`]: {
      outline: "2px solid $theme-vl-n3",
    },
  },

  disabled: {
    [`+ ${SFormCheckboxBox}`]: {
      backgroundColor: "$theme-n1-n10",
      borderColor: "$theme-n4-n7",
    },
  },

  checked: {
    [`+ ${SFormCheckboxBox}`]: {
      backgroundColor: "$theme-vl-yl",
      borderColor: "transparent",

      [`${SFormCheckboxTick}`]: {
        opacity: 1,
        transform: "rotate(0deg)",
      },

      [`${SFormCheckboxHyphen}`]: {
        opacity: 1,
        transform: "rotate(0deg)",
      },
    },

    hover: {
      [`+ ${SFormCheckboxBox}`]: {
        boxShadow: "0 0 0 3px $colors$theme-vlr-ydr",
      },
    },

    disabled: {
      [`+ ${SFormCheckboxBox}`]: {
        backgroundColor: "$theme-vlr-ydr",

        [`${SFormCheckboxTick}`]: {
          color: "$theme-w-yd",
        },

        [`${SFormCheckboxHyphen}`]: {
          color: "$theme-w-yd",
        },
      },
    },
  },
})
