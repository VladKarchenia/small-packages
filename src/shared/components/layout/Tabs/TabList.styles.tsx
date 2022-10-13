import { styled } from "@/config";
import { Flex } from "../Flex";

export const STabList = styled(Flex, {
  borderBottom: "1px solid $neutrals-4",
  alignItems: "start",
  whiteSpace: "nowrap",
  overflowX: "auto",

  "@md": {
    overflow: "visible",
  },
});
