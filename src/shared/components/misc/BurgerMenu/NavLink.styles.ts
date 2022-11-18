import { styled } from "@/config"

export const SNavLink = styled("a", {
  $$color: "$colors$neutrals-7",
  color: "$$color",
  display: "inline-block",
  position: "relative",
  textDecoration: "none",

  variants: {
    selected: {
      true: {
        $$color: "$color$neutrals-9",
      },
    },
    role: {
      guest: {
        $$color: "$colors$neutrals-9",
      },
      host: {
        $$color: "$colors$neutrals-9",
      },
    },
  },
})
