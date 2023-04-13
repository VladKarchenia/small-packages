import { styled } from "@/stitches/config"

import { Flex } from "../Flex"

export const STabList = styled(Flex, {
  marginBottom: "$20",
  borderBottom: "1px solid $theme-n4-n7",

  "@md": {
    marginBottom: "$32",
  },
})
