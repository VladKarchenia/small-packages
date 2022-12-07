import { styled } from "@/config"
import { Flex } from "../Flex"

export const STabList = styled(Flex, {
  alignItems: "start",
  marginBottom: "$20",
  whiteSpace: "nowrap",
  overflowX: "auto",

  "@md": {
    marginBottom: "$24",
    borderBottom: "1px solid $neutrals-4",
    overflow: "visible",
  },
})
