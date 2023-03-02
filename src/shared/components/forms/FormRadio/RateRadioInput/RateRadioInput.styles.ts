import { styled } from "@/stitches/config"
import { rgba } from "@/stitches/utils"

import { Flex } from "@/shared/components"

export const SRateRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
})

export const SRateRadioInputBox = styled(Flex, {
  width: "100%",
  padding: "$12",
  borderRadius: "$8",
  border: "1px solid $neutrals-4",
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
      borderColor: "$system-black",
    },
  },

  keyboardFocus: {
    [`+ ${SRateRadioInputBox}`]: {
      borderColor: "$brand-yellow-dark",
      boxShadow: `0 $space$2 $space$4 0 ${rgba("neutrals-9", 0.15)}`,
    },
  },
})
