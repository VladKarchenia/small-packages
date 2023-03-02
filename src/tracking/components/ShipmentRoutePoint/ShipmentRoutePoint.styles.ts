import { styled } from "@/stitches/config"

import { Box, Flex } from "@/shared/components"

export const SRoutePointWrapper = styled(Flex, {
  position: "relative",

  "&:not(:last-of-type)": {
    paddingBottom: "$24",
  },

  "@sm": {
    "&:not(:last-of-type)": {
      paddingBottom: "$32",
    },
  },

  variants: {
    last: {
      false: {
        before: {
          content: "''",
          margin: "auto",
          // $40 - offset at the top and bottom of the line
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
  minWidth: "$24",
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
  height: "$4",
  width: "$4",
  backgroundColor: "$system-white",
  borderRadius: "$rounded",
})
