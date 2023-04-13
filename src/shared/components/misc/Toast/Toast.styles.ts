import { styled } from "@/stitches/config"
import { rgba } from "@/stitches/utils"

import { Flex } from "@/shared/components"

export const SToastIcon = styled(Flex, {
  $$backgroundColor: "transparent",
  height: "$40",
  borderRadius: "$8",
  backgroundColor: "$$backgroundColor",

  variants: {
    type: {
      error: {
        $$backgroundColor: rgba("special-error", 0.2),
      },
      info: {
        $$backgroundColor: rgba("special-info", 0.2),
      },
      warning: {
        $$backgroundColor: rgba("special-warning", 0.2),
      },
      success: {
        $$backgroundColor: rgba("special-success", 0.2),
      },
      default: {
        $$backgroundColor: "transparent",
      },
    },
  },
})
