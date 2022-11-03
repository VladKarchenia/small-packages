import { styled } from "@/config"
import { Flex } from "@/shared/components"
import { rgba } from "@/utils"

export const SRateRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  paddingBottom: "$12",

  lastChild: {
    paddingBottom: "$0",
  },
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
      opacity: 0.5,
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
      boxShadow: `0px 2px 4px 0px ${rgba("neutrals-9", 0.15)}`,
    },
  },
})
