import { styled } from "@/config"

export const SInputPreview = styled("button", {
  reset: true,
  display: "grid",
  gridTemplateColumns: "1fr $24",
  textAlign: "left",
  gap: "$16",
  width: "100%",
  alignItems: "center",
  border: "1px solid $neutrals-3",
  paddingX: "$16",
  paddingY: "$12",
  borderRadius: "$8",

  "@md": {
    border: "none",
    width: "auto",
    padding: "$0",
  },
})
