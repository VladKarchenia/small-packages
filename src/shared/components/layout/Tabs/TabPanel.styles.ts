import { styled } from "@/stitches/config"

export const STabPanel = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "hidden",
  transition: "150ms ease-out",
  transitionProperty: "transform, opacity",

  "&[aria-hidden='true']": {
    opacity: 0,
    visibility: "hidden",
    position: "absolute",
  },

  "&[aria-hidden='false']": {
    opacity: 1,
    visibility: "visible",
    transform: "none",
  },

  variants: {
    animate: {
      true: {
        transform: "translateY($16)",
      },
    },
  },

  defaultVariants: {
    animate: true,
  },
})
