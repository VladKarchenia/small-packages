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
          borderRight: "1px dashed $theme-b-n3",
          position: "absolute",
          top: "$32",
          left: 10,
        },
      },
    },

    active: {
      false: {
        before: {
          borderRightColor: "$neutrals-5",
        },
      },
    },
  },

  compoundVariants: [
    {
      last: "false",
      active: "false",
      css: {
        before: {
          borderRightColor: "$neutrals-5",
        },
      },
    },
  ],
})

export const SRoutePointIcon = styled(Flex, {
  width: "$20",
  minWidth: "$20",
  height: "$20",
  marginTop: "$2",
  marginRight: "$12",
  backgroundColor: "$theme-n4-n9",

  variants: {
    active: {
      true: {
        backgroundColor: "$theme-vl-yl",
        color: "$theme-w-n11",
      },
      false: {
        backgroundColor: "$theme-vlr-ydr",
        color: "$theme-w-n9",
      },
    },
  },
})

export const SDot = styled(Box, {
  height: "$4",
  width: "$4",

  variants: {
    active: {
      true: {
        backgroundColor: "$theme-w-n11",
      },
      false: {
        backgroundColor: "$theme-w-n9",
      },
    },
  },
})
