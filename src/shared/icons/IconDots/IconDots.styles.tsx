import { styled } from "@/config";
import { animations } from "@/utils";
import { SIcon } from "../Icon/Icon.styles";

export const SIconDots = styled(SIcon, {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "1em",

  variants: {
    block: {
      false: {
        display: "inline-flex",
      },
    },
  },

  "span, &::before, &::after": {
    flex: "none",
    width: ".25em",
    height: ".25em",
    borderRadius: "50%",
    backgroundColor: "$neutrals-7",
    animation: `600ms ${animations.scalePulse} ease-in-out infinite alternate`,
  },

  "&::before, &::after": {
    content: "''",
  },

  "&::before": {
    left: "0",
    animationDelay: "0s",
  },

  "&::after": {
    right: "0",
    animationDelay: "240ms",
  },

  span: {
    animationDelay: "120ms",
  },
});
