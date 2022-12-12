import { styled } from "@/config"

export const STrackerLabel = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "max-content",
  height: "$20",
  backgroundColor: "$neutrals-6",
  borderRadius: "$16",
  paddingX: "$12",

  "@md": {
    height: "$24",
    paddingX: "$16",
  },

  "@lg": {
    height: "$24",
  },
})
