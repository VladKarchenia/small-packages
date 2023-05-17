import { styled } from "@/stitches/config"

export const SProfileBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$40",
  height: "$40",
  backgroundColor: "$theme-n2-n8",
  borderRadius: "$rounded",
  cursor: "pointer",
  outline: "none",
})

export const SSwitchOrganizationButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  gap: "$8",
  height: "$40",
  padding: "$0 $12",
  color: "$theme-b-n3",
  cursor: "pointer",
  outline: "none",
  outlineOffset: 2,

  hover: {
    [`${SProfileBox}`]: {
      backgroundColor: "$theme-n4-n7",
    },
  },

  keyboardFocus: {
    outline: "1px solid $theme-vl-n3",
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

export const SOrganizationItem = styled("button", {
  reset: true,
  width: "$40",
  height: "$40",
  backgroundColor: "$theme-n2-n8",
  borderRadius: "$rounded",
  cursor: "pointer",
  outline: "none",

  hover: {
    backgroundColor: "$theme-n4-n7",
  },

  keyboardFocus: {
    backgroundColor: "$theme-n4-n7",
  },
})
