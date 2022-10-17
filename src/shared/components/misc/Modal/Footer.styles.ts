import { styled } from "@/config"

export const SModalFooter = styled("footer", {
  position: "sticky",
  zIndex: "$2",
  bottom: "-$$modalContentYPadding",
  marginBottom: "-$$modalContentYPadding",
  marginX: "-$$modalContentXPadding",
  backgroundColor: "$neutrals-0",
  borderTop: "1px solid $neutrals-4",
  padding: "$16 $24",
})
