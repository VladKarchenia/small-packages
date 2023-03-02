import { styled } from "@/stitches/config"
import { multipleSelectors, rgba } from "@/stitches/utils"

export const SFormRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "flex-start",
})

export const SFormRadioInputBox = styled("span", {
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
  backgroundColor: "$system-black",
  border: "1px solid $system-black",
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
    view: {
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
            boxShadow: `0 $space$2 $space$4 0 ${rgba("neutrals-9", 0.2)}`,
          },
        },

        keyboardFocus: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$system-black",
            boxShadow: `0 $space$2 $space$4 0 ${rgba("neutrals-9", 0.15)}`,
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
            borderColor: "$system-black",

            [`${SFormRadioInputCircle}`]: {
              opacity: 1,
              transform: "scale(1)",
            },
          },

          ...multipleSelectors(["hover", "keyboardFocus"], {
            [`+ ${SFormRadioInputBox} ${SFormRadioInputCircle}`]: {
              backgroundColor: "$system-black",
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
