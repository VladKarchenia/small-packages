import { styled } from "@/stitches/config"
import { multipleSelectors } from "@/stitches/utils"

export const STabListItem = styled("button", {
  reset: true,
  paddingTop: "$20",
  paddingBottom: "$8",
  color: "$theme-n6-n5",
  position: "relative",
  cursor: "pointer",
  outline: "none",

  "@sm": {
    paddingTop: 0,
    paddingBottom: "$12",
  },

  "&:not(:last-of-type)": {
    marginRight: "$24",

    "@sm": {
      marginRight: "$48",
    },
  },

  "&[aria-selected='true']": {
    color: "$theme-b-yl",

    "& > p": {
      textShadow: "0 0 .75px var(--colors-theme-b-yl)",
    },

    after: {
      transform: "scaleX(1)",
    },

    hover: {
      color: "$theme-vl-ylr",

      "& > p": {
        textShadow: "0 0 .75px var(--colors-theme-vl-ylr)",
      },

      after: {
        backgroundColor: "$theme-vl-ylr",
      },
    },

    keyboardFocus: {
      color: "$theme-vl-ylr",

      "& > p": {
        textShadow: "0 0 .75px var(--colors-theme-vl-ylr)",
      },

      after: {
        backgroundColor: "$theme-vl-ylr",
        transform: "scaleX(1)",
        opacity: 0.5,
      },
    },

    active: {
      color: "$theme-vp-yp",

      "& > p": {
        textShadow: "0 0 .75px var(--colors-theme-vp-yp)",
      },

      after: {
        backgroundColor: "$theme-vp-yp",
      },
    },
  },

  ...multipleSelectors(["hover", "active"], {
    color: "$theme-n7-n3",

    "& > p": {
      textShadow: "0 0 .75px var(--colors-theme-n7-n3)",
    },
  }),

  keyboardFocus: {
    color: "$theme-n7-n3",

    "& > p": {
      textShadow: "0 0 .75px var(--colors-theme-n7-n3)",
    },

    after: {
      backgroundColor: "$theme-n7-n3",
      transform: "scaleX(1)",
      opacity: 0.5,
    },
  },

  after: {
    backgroundColor: "$theme-b-yl",
    borderRadius: "$8",
    content: "''",
    bottom: -1,
    height: "$2",
    left: 0,
    right: 0,
    position: "absolute",
    transformOrigin: "left center",
    transform: "scaleX(0)",
    transition: "100ms transform ease-out",
  },
})
