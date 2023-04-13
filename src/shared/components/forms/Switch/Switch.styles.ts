import { styled } from "@/stitches/config"
import { boxShadows, easing } from "@/stitches/utils"

export const SSwitchIndicator = styled("div", {
  position: "absolute",
  top: "-$2",
  zIndex: "-$1",
  width: "$20",
  height: "$20",
  backgroundColor: "$theme-w-n5",
  borderRadius: "$rounded",
  boxShadow: boxShadows.switch,
  transition: easing.smooth({
    property: "transform",
    duration: 150,
  }),

  variants: {
    checked: {
      true: {
        backgroundColor: "$theme-vl-yl",
        transform: "translateX($16)",
        boxShadow: "none",
      },
      false: {
        transform: "translateX($0)",
      },
    },
  },
})

export const SSwitchOption = styled("label", {
  cursor: "pointer",

  before: {
    content: "''",
    position: "absolute",
    top: "-$2",
    width: "$20",
    height: "$20",
    backgroundColor: "$theme-w-n5",
    borderRadius: "$rounded",
    transition: easing.smooth({
      property: "transform",
      duration: 150,
    }),
  },
})

export const SSwitchOptionBox = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // we need 36px for a more nice focus state
  width: `calc($32 + $4)`,
  height: "$16",
  backgroundColor: "$theme-n5-n7",
  borderRadius: "$pill",
  zIndex: "$1",
  outline: "2px solid transparent",
  outlineOffset: "$space$4",
})

export const SSwitchOptionInput = styled("input", {
  srOnly: true,

  keyboardFocus: {
    [`+ ${SSwitchOptionBox}`]: {
      outline: "2px solid $theme-vl-n3",
    },
  },
})

export const SSwitch = styled("div", {
  display: "flex",
  position: "relative",
  top: 1,
  right: "$2",

  hover: {
    [`${SSwitchIndicator}`]: {
      boxShadow: `${boxShadows.switch}, 0 0 0 5px $colors$theme-n2-n7`,
    },
  },

  variants: {
    checked: {
      true: {
        [`${SSwitchOption}`]: {
          before: {
            backgroundColor: "$theme-vl-yl",
            transform: "translateX($16)",
          },
        },

        [`${SSwitchOptionBox}`]: {
          backgroundColor: "$theme-vlr-ydr",
        },

        hover: {
          [`${SSwitchIndicator}`]: {
            boxShadow: "0 0 0 5px $colors$theme-vlt-ydt",
          },
        },
      },
      false: {
        [`${SSwitchOption}`]: {
          before: {
            transform: "translateX($0)",
          },
        },
      },
    },
  },
})
