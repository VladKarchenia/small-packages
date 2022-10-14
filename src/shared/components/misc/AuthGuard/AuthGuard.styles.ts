import { styled } from "@/config"
import { Box } from "@/shared/components"

export const SAuthGuard = styled(Box, {
  backgroundColor: "$system-white",
  minHeight: `calc((var(--vh) * 100) - $128)`,
  padding: "$24",

  "@md": {
    border: "1px solid $neutrals-4",
    padding: "$48",
    minHeight: "auto",
  },
})
