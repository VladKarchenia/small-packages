import { styled } from "@/stitches/config"
import { multipleSelectors } from "@/stitches/utils"

import { ButtonIcon } from "@/shared/components"

export const SActionButton = styled(ButtonIcon, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$40",
  height: "$40",
  backgroundColor: "$neutrals-1",
  borderRadius: "$rounded",
  transition: "50ms all",
  border: "1px solid transparent",
  color: "$neutrals-9",

  ...multipleSelectors(["hover", "active"], {
    outline: "none",
    borderColor: "$neutrals-9",
  }),

  keyboardFocus: {
    outline: "currentcolor auto 1px",
    outlineColor: "-webkit-focus-ring-color",
  },

  disabled: {
    backgroundColor: "$neutrals-1",
    color: "$neutrals-5",
    pointerEvents: "none",
  },

  "@md": {
    width: "$48",
    height: "$48",
    backgroundColor: "$system-white",

    hover: {
      backgroundColor: "$neutrals-1",
      borderColor: "transparent",
    },

    keyboardFocus: {
      backgroundColor: "$neutrals-1",
      borderColor: "transparent",
    },

    active: {
      borderColor: "$neutrals-9",
    },

    disabled: {
      backgroundColor: "$system-white",
    },
  },
})
