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
        $$backgroundColor: rgba("brand-blue-dark", 0.2),
      },
      warning: {
        $$backgroundColor: rgba("brand-yellow-primary", 0.2),
      },
      success: {
        $$backgroundColor: rgba("brand-green-primary", 0.2),
      },
      default: {
        $$backgroundColor: "transparent",
      },
    },
  },
})
