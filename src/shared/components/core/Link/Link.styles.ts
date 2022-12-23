import { styled } from "@/config"
import { multipleSelectors } from "@/utils"

export const SLink = styled("a", {
  reset: true,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$system-black",
  transition: "150ms color ease-out",

  focus: {
    color: "$neutrals-5",
  },

  hover: {
    color: "$neutrals-5",
  },

  variants: {
    isCtaIntent: {
      true: {
        color: "$neutrals-7",
        transition: "150ms color ease-out, 200ms transform ease-out",

        ...multipleSelectors(["focus", "hover"], {
          color: "$neutrals-9",
          transform: "translateX($4)",
        }),
      },
    },

    underline: {
      true: {
        textDecoration: "underline",
        textUnderlineOffset: "$space$4",

        focus: {
          textDecoration: "underline",
        },

        hover: {
          textDecoration: "underline",
        },
      },
    },
  },
})

export const SLinkIcon = styled("div", {
  display: "flex",
  marginRight: "$4",
  marginTop: "$2",
})
