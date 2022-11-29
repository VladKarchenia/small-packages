import { styled } from "@/config"
import { Box, Flex } from "@/shared/components"

export const SRoutePointWrapper = styled(Flex, {
  position: "relative",

  "&:not(:last-of-type)": {
    paddingBottom: "$24",
  },

  variants: {
    last: {
      false: {
        before: {
          content: "''",
          margin: "auto",
          height: `calc(100% - $40)`,
          borderRight: "1px dashed $neutrals-7",
          position: "absolute",
          top: "$32",
          left: "$12",
        },
      },
    },
  },
})

export const SRoutePointIcon = styled(Flex, {
  width: "$24",
  height: "$24",
  backgroundColor: "$neutrals-5",
  borderRadius: "$rounded",
  marginRight: "$8",
  color: "$system-white",

  variants: {
    active: {
      true: {
        backgroundColor: "$neutrals-7",
      },
    },
  },
})

export const SDot = styled(Box, {
  height: "$8",
  width: "$8",
  backgroundColor: "$system-white",
  borderRadius: "$rounded",
})
