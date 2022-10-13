import { styled } from "@/config";

export const SIcon = styled("span", {
  verticalAlign: "middle",

  variants: {
    size: {
      xs: { fontSize: "1em" },
      sm: { fontSize: "1.5em" },
      md: { fontSize: "2em" },
      lg: { fontSize: "3em" },
    },

    rotate: {
      0: { transform: "rotate(0deg)" },
      90: { transform: "rotate(90deg)" },
      180: { transform: "rotate(180deg)" },
      270: { transform: "rotate(270deg)" },
    },

    block: {
      false: { display: "inline-block" },
      true: { display: "block" },
    },
  },

  defaultVariants: {
    block: "false",
    size: "sm",
  },
});

export const SIconSvg = styled("svg", {
  display: "block",

  variants: {
    fixedSize: {
      false: { height: "1em" },
      true: { height: "initial" },
    },
  },
});
