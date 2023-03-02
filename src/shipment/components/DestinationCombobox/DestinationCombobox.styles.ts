import { styled } from "@/stitches/config"

import { ComboboxItem } from "@/shared/components"

export const SDestinationComboboxItem = styled(ComboboxItem, {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  paddingY: "$16",
  borderBottom: "1px solid $neutrals-4",
  position: "relative",
  zIndex: "$0",

  "@md": {
    paddingY: "$8",
    borderBottom: "none",
  },

  lastOfType: {
    borderBottom: "none",
  },
})
