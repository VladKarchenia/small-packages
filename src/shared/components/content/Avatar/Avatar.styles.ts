import { styled } from "@/config"

export const SAvatar = styled("div", {
  overflow: "hidden",
  borderRadius: "9999px",
  fontFamily: "$serif",
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  alignItems: "center",

  variants: {
    size: {
      tiny: { width: "$32", height: "$32" },
      small: { width: "$40", height: "$40" },
      medium: { width: "$64", height: "$64" },
      large: { width: "$80", height: "$80" },
    },
    highlight: {
      true: {
        boxShadow: "0 0 0 2px $colors$neutrals-0, 0 0 0 4px $colors$brand-yellow-primary",
      },
    },
    initial: {
      true: {
        border: "1px solid $colors$neutrals-4",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },

  defaultVariants: {
    size: "small",
  },

  compoundVariants: [
    {
      size: "tiny",
      initial: true,
      css: { fontSize: 16 },
    },
    {
      size: "small",
      initial: true,
      css: { fontSize: 24 },
    },
    {
      size: "medium",
      initial: true,
      css: { fontSize: 36 },
    },
    {
      size: "large",
      initial: true,
      css: { fontSize: 48 },
    },
  ],
})
