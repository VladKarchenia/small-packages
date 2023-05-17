import { styled } from "@/stitches/config"

export const SStatusFilterButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  gap: "$8",
  height: "$40",
  padding: "$0 $12",
  backgroundColor: "$theme-w-n8",
  color: "$theme-b-n3",
  border: "1px solid $theme-n4-n9",
  cursor: "pointer",
  outline: "none",
  boxSizing: "border-box",

  hover: {
    borderColor: "$theme-n6-n10",
  },

  keyboardFocus: {
    borderColor: "$theme-vl-n3",
  },

  disabled: {
    backgroundColor: "$theme-n1-n10",
    color: "$theme-n4-n7",
    borderColor: "$theme-n4-n10",
    cursor: "default",
  },

  variants: {
    active: {
      true: {
        borderColor: "$theme-vl-n3",

        hover: {
          borderColor: "$theme-vl-n3",
        },
      },
    },
  },
})
