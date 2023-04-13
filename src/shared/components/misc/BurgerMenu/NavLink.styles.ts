import { styled } from "@/stitches/config"

export const SNavLink = styled("a", {
  reset: true,
  color: "$theme-b-n3",
  display: "inline-block",
  position: "relative",
  textDecoration: "none",
  outline: "none",

  // TODO: add states
  hover: {
    outline: "1px solid $theme-b-n3",
  },

  keyboardFocus: {
    outline: "1px solid $theme-b-n3",
  },
})
