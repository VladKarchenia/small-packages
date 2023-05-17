import { styled } from "@/stitches/config"

export const SNavButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "$48",
  backgroundColor: "transparent",
  color: "$neutrals-6",
  border: "1px solid transparent",
  position: "relative",
  cursor: "pointer",
  transition: "150ms ease-out",
  outline: "none",

  before: {
    opacity: 0,
    content: "''",
    width: "$2",
    height: "100%",
    backgroundColor: "$theme-w-n3",
    position: "absolute",
    left: 0,
    transition: "150ms ease-out",
  },

  hover: {
    backgroundColor: "$theme-n9-n8",
  },

  keyboardFocus: {
    backgroundColor: "$theme-b-n9",
    borderColor: "$theme-w-n3",
  },

  active: {
    backgroundColor: "$theme-n9-n8",
  },

  disabled: {
    pointerEvents: "none",
    color: "$neutrals-7",
  },

  variants: {
    selected: {
      true: {
        color: "$theme-w-n3",

        keyboardFocus: {
          before: {
            opacity: 0,
          },
        },

        before: {
          opacity: 1,
        },
      },
    },
  },
})
