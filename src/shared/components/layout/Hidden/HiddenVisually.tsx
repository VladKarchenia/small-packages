import { styled } from "@/config"

export const HiddenVisually = styled("div", {
  position: "absolute",
  overflow: "hidden",
  width: 1,
  height: 1,
  clip: "rect(1px, 1px, 1px, 1px)",
  whiteSpace: "nowrap",
})
