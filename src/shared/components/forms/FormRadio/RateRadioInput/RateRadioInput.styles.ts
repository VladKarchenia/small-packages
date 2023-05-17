import { styled } from "@/stitches/config"

import { Flex } from "@/shared/components"

export const SRateRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
})

export const SRateRadioInputBox = styled(Flex, {
  width: "100%",
  padding: "$12",
  backgroundColor: "$theme-w-n9",
  border: "1px solid $theme-n4-tr",
  transition: "150ms ease-out",
  cursor: "pointer",
})

export const SRateRadioInput = styled("input", {
  hiddenInput: true,

  disabled: {
    [`+ ${SRateRadioInputBox}`]: {
      cursor: "default",
    },
  },

  checked: {
    [`+ ${SRateRadioInputBox}`]: {
      borderColor: "$theme-b-n3",
    },
  },

  keyboardFocus: {
    [`+ ${SRateRadioInputBox}`]: {
      borderColor: "$brand-yellow-dark",
    },
  },
})
