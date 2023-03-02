import { styled } from "@/stitches/config"

export const SModalCloseButton = styled("button", {
  reset: true,
  position: "absolute",
  zIndex: "$3",
  top: "$8",
  right: "$8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$neutrals-9",
  borderRadius: "$4",
  transition: "200ms ease-out",
  cursor: "pointer",

  focus: {
    outline: "none",
  },

  hover: {
    color: "$neutrals-7",
  },

  keyboardFocus: {
    backgroundColor: "$neutrals-3",
    color: "$neutrals-9",
  },

  variants: {
    variant: {
      text: {
        padding: "$4 $8",
      },
      icon: {
        height: "$24",
        width: "$24",
        backgroundColor: "$neutrals-3",
        borderRadius: "50%",
      },
    },
  },

  defaultVariants: {
    variant: "icon",
  },
})
