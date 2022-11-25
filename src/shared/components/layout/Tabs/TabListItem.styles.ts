import { styled } from "@/config"

export const STabListItem = styled("button", {
  reset: true,
  paddingTop: "$16",
  paddingBottom: "$4",
  position: "relative",
  textAlign: "left",

  after: {
    backgroundColor: "$neutrals-9",
    content: "''",
    bottom: "$0",
    height: "$2",
    left: "$0",
    right: "$0",
    position: "absolute",
    transformOrigin: "left center",
    transform: "scaleX(0)",
    transition: "100ms transform ease-out",
  },

  "@sm": {
    hover: {
      after: {
        transform: "scaleX(1)",
        opacity: 0.5,
      },
    },
  },

  "@md": {
    paddingBottom: "$20",
  },

  hover: {
    cursor: "pointer",
  },

  keyboardFocus: {
    outline: "none",
    after: {
      transform: "scaleX(1)",
      opacity: 0.5,
    },
  },

  "&:not(:last-of-type)": {
    marginRight: "$24",

    "@sm": {
      marginRight: "$32",
    },
  },

  "&[aria-selected='true']": {
    color: "$neutrals-9",
    after: {
      transform: "scaleX(1)",
    },
  },
})
