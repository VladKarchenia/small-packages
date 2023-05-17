import { styled } from "@/stitches/config"

export const SFormRadioInputLabel = styled("label", {
  display: "flex",
  alignItems: "center",
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

export const SFormRadioInputBox = styled("span", {
  flex: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$20",
  height: "$20",
  backgroundColor: "transparent",
  border: "2px solid $neutrals-5",
  borderRadius: "$rounded",
  transition: "150ms ease-out",
  outline: "2px solid transparent",
  outlineOffset: "$space$4",
})

export const SFormRadioInputCircle = styled("span", {
  height: "$12",
  width: "$12",
  backgroundColor: "$theme-vl-yl",
  borderRadius: "$rounded",
  opacity: 0,
  transform: "scale(0.5)",
  transition: "150ms ease-out",
})

export const SFormRadioInput = styled("input", {
  hiddenInput: true,

  variants: {
    view: {
      circle: {
        hover: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$theme-n6-n5",
            boxShadow: "0 0 0 5px $colors$theme-n2-n7",
          },
        },

        keyboardFocus: {
          [`+ ${SFormRadioInputBox}`]: {
            outline: "2px solid $theme-vl-n3",
          },
        },

        disabled: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$theme-n4-n7",
          },
        },

        checked: {
          [`+ ${SFormRadioInputBox}`]: {
            borderColor: "$theme-vl-yl",

            [`${SFormRadioInputCircle}`]: {
              opacity: 1,
              transform: "scale(1)",
            },
          },

          hover: {
            [`+ ${SFormRadioInputBox}`]: {
              boxShadow: "0 0 0 5px $colors$theme-vlr-ydr",
            },
          },

          disabled: {
            [`+ ${SFormRadioInputBox}`]: {
              borderColor: "$theme-vlr-ydr",

              [`${SFormRadioInputCircle}`]: {
                backgroundColor: "$theme-vlr-ydr",
              },
            },
          },
        },
      },
    },
  },
})
