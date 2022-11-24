import { styled } from "@/config"

import { rgba } from "@/utils"

import { IconHelp, IconMore } from "@/shared/icons"

export const SIconTooltip = styled(IconHelp, {
  backgroundColor: "$neutrals-0",
  borderRadius: "50%",
  boxShadow: "inset 0 0 0 1px $colors$neutrals-4",
  transition: "150ms all ease-out",

  hover: {
    backgroundColor: "$neutrals-2",
  },

  parentKeyboardFocus: {
    backgroundColor: "$neutrals-2",
    boxShadow: `inset 0 0 0 1px $colors$neutrals-4, 0 2px 4px 0 ${rgba("neutrals-9", 0.1)}`,
  },
})

export const SIconPopup = styled(IconMore, {
  backgroundColor: "$neutrals-0",
  borderRadius: "50%",
  transition: "150ms all ease-out",
})
