import { styled } from "@/stitches/config"

export const SModalFooter = styled("footer", {
  position: "sticky",
  zIndex: "$2",
  bottom: "-$$modalContentYPadding",
  marginBottom: "-$$modalContentYPadding",
  marginX: "-$$modalContentXPadding",
  backgroundColor: "$system-white",
  borderTop: "1px solid $neutrals-4",
  padding: "$16 $24",
})
