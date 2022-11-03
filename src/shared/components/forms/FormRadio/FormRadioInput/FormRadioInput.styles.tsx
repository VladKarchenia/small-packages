import { styled } from "@/config"
import { multipleSelectors, rgba } from "@/utils"

export const SFormRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
})

export const SFormRadioInputBox = styled("span", {
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
  borderRadius: "50%",
})

export const SFormRadioTickInputBox = styled("span", {
  width: "$24",
  height: "$24",
  flex: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  opacity: 0,
  transition: "150ms ease-out",
})

export const SFormRadioInputCircle = styled("span", {
  height: "$16",
  width: "$16",
  backgroundColor: "$brand-yellow-primary",
  border: "1px solid $brand-yellow-primary",
  borderRadius: "50%",
  opacity: 0,
  transform: "scale(0.5)",
  transition: "150ms ease-out",
})

export const SFormRadioTickCopyBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingY: "$16",

  "@md": {
    paddingX: "$24",
  },
})

export const SFormRadioInput = styled("input", {
  hiddenInput: true,

  variants: {
    iconType: {
      tick: {
        disabled: {
          [`+ ${SFormRadioTickCopyBox}`]: {
            opacity: 0.5,
          },
        },

        checked: {
          [`+ ${SFormRadioTickCopyBox}`]: {
            p: {
              fontWeight: 500,
            },
            [`${SFormRadioTickInputBox}`]: {
              opacity: 1,
            },
          },
        },
      },
      circle: {
        hover: {
          [`+ ${SFormRadioInputBox}`]: {
            boxShadow: `0px 2px 4px 0px ${rgba("neutrals-9", 0.2)}`,
          },
        },

        keyboardFocus: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$brand-yellow-dark",
            boxShadow: `0px 2px 4px 0px ${rgba("neutrals-9", 0.15)}`,
          },
        },

        disabled: {
          [`+ ${SFormRadioInputBox}`]: {
            backgroundColor: "$neutrals-3",
            borderColor: "$neutrals-5",
            opacity: 0.5,
          },
        },

        checked: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$brand-yellow-darker",

            [`${SFormRadioInputCircle}`]: {
              opacity: 1,
              transform: "scale(1)",
            },
          },

          ...multipleSelectors(["hover", "keyboardFocus"], {
            [`+ ${SFormRadioInputBox} ${SFormRadioInputCircle}`]: {
              backgroundColor: "$brand-yellow-light",
            },
          }),

          disabled: {
            [`+ ${SFormRadioInputBox}`]: {
              opacity: 0.5,
            },
          },
        },
      },
    },
  },
})
