import { styled } from "@/config"
import { Flex } from "../Flex"

export const STabList = styled(Flex, {
  alignItems: "start",
  whiteSpace: "nowrap",
  overflowX: "auto",

  "@md": {
    overflow: "visible",
  },
})
