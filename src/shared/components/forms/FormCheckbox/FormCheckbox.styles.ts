import { styled } from "@/stitches/config"
import { multipleSelectors, rgba } from "@/stitches/utils"

import { IconTick } from "@/shared/icons"

export const SFormCheckboxLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  cursor: "pointer",
})

export const SFormCheckboxBox = styled(
  "span",
  {
    backgroundColor: "$system-white",
    border: "1px solid $neutrals-9",
    width: "$24",
    height: "$24",
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "150ms ease-out",
    cursor: "pointer",
  },
  {
    borderRadius: "$4",
    color: "$neutrals-9",
  },
)

export const SFormCheckboxTick = styled(IconTick, {
  opacity: 0,
  color: "$system-white",
  transform: "rotate(90deg)",
  transition: "150ms ease-out",

  svg: {
    display: "block",
  },
})

export const SFormCheckboxInput = styled("input", {
  hiddenInput: true,

  hover: {
    [`+ ${SFormCheckboxBox}`]: {
      boxShadow: `0 $space$2 $space$4 0 ${rgba("neutrals-9", 0.2)}`,
    },
  },

  keyboardFocus: {
    [`+ ${SFormCheckboxBox}`]: {
      borderColor: "$brand-yellow-dark",
      boxShadow: `0 $space$2 $space$4 0 ${rgba("neutrals-9", 0.15)}`,
    },
  },

  disabled: {
    [`+ ${SFormCheckboxBox}`]: {
      backgroundColor: "$neutrals-3",
      borderColor: "$neutrals-5",
      opacity: 0.5,
    },
  },

  checked: {
    [`+ ${SFormCheckboxBox}`]: {
      backgroundColor: "$system-black",

      [`${SFormCheckboxTick}`]: {
        opacity: 1,
        transform: "rotate(0deg)",
      },
    },

    ...multipleSelectors(["hover", "keyboardFocus"], {
      [`+ ${SFormCheckboxBox}`]: {
        backgroundColor: "$system-black",
      },
    }),

    disabled: {
      [`+ ${SFormCheckboxBox}`]: {
        opacity: 0.5,
      },
    },
  },
})
