import { styled } from "@/config";
import { multipleSelectors, rgba } from "@/utils";

import { IconTick } from "@/shared/icons";

export const SFormCheckboxLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
});

export const SFormCheckboxBox = styled(
  "span",
  {
    backgroundColor: "$neutrals-0",
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
    borderRadius: 2,
    color: "$neutrals-9",
  }
);

export const SFormCheckboxTick = styled(IconTick, {
  opacity: 0,
  transform: "rotate(90deg)",
  transition: "150ms ease-out",

  svg: {
    display: "block",
  },
});

export const SFormCheckboxInput = styled("input", {
  hiddenInput: true,

  hover: {
    [`+ ${SFormCheckboxBox}`]: {
      boxShadow: `0 2px 4px 0 ${rgba("neutrals-9", 0.2)}`,
    },
  },

  keyboardFocus: {
    [`+ ${SFormCheckboxBox}`]: {
      borderColor: "$brand-yellow-dark",
      boxShadow: `0 2px 4px 0 ${rgba("neutrals-9", 0.15)}`,
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
      backgroundColor: "$brand-yellow-primary",
      borderColor: "$brand-yellow-primary",

      [`${SFormCheckboxTick}`]: {
        opacity: 1,
        transform: "rotate(0deg)",
      },
    },

    ...multipleSelectors(["hover", "keyboardFocus"], {
      [`+ ${SFormCheckboxBox}`]: {
        backgroundColor: "$brand-yellow-light",
        borderColor: "$brand-yellow-light",
      },
    }),

    disabled: {
      [`+ ${SFormCheckboxBox}`]: {
        opacity: 0.5,
      },
    },
  },
});
