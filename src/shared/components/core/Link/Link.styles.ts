import { styled } from "@/stitches/config"

export const SLink = styled("a", {
  reset: true,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$theme-b-yl",
  transition: "150ms color ease-out",
  position: "relative",

  hover: {
    color: "$theme-vl-ylr",
  },

  keyboardFocus: {
    color: "$theme-vl-yl",
    textDecoration: "underline",
    textUnderlineOffset: "$space$4",
  },

  active: {
    color: "$theme-vp-yp",
  },

  disabled: {
    color: "$theme-n4-ydr",
  },
})

export const SLinkIcon = styled("div", {
  display: "flex",
  marginRight: "$4",
  marginTop: "$2",
})
