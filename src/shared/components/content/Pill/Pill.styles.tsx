import { styled } from "@/config"

export const SPill = styled("button", {
  $$borderColor: "$system-black",
  reset: true,
  backgroundColor: "$system-black",
  border: "1px solid",
  borderRadius: "$pill",
  borderColor: "$$borderColor",
  display: "flex",
  alignItems: "center",
  color: "$system-white",
  cursor: "pointer",
  transition: "100ms border-color, 100ms transform",

  "@supportsHover": {
    hover: {
      $$borderColor: "$colors$neutrals-9",
    },
  },

  active: {
    transform: "scale(0.95)",
  },

  disabled: {
    pointerEvents: "none",
    backgroundColor: "$neutrals-2",
    $$borderColor: "$colors$neutrals-2",

    "& > *": {
      color: "$neutrals-7",
    },
  },

  variants: {
    selected: {
      true: { $$borderColor: "$colors$neutrals-9" },
    },

    active: {
      true: {
        $$borderColor: "$colors$brand-yellow-darker",
        "@supportsHover": {
          hover: {
            $$borderColor: "$colors$brand-yellow-darker",
          },
        },
      },
    },

    size: {
      small: { height: "$32", paddingX: "$12" },
      medium: { height: "$40", paddingX: "$16" },
      large: { height: "$48", paddingX: "$20" },
    },
  },

  compoundVariants: [
    {
      selected: true,
      active: true,
      css: {
        $$borderColor: "$colors$brand-yellow-darker",
      },
    },
  ],

  defaultVariants: {
    size: "small",
  },
})

export const SSelectedDot = styled("div", {
  height: "$8",
  width: "$8",
  borderRadius: "$rounded",
  backgroundColor: "$colors$brand-yellow-dark",
  marginLeft: "$8",
  marginTop: "$2",
})
