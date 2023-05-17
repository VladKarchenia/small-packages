import { styled } from "@/stitches/config"

import { ComboboxItem } from "@/shared/components"

export const SDestinationComboboxItem = styled(ComboboxItem, {
  display: "flex",
  alignItems: "center",
  padding: "$16",
  borderBottom: "1px solid $neutrals-5",
  color: "$theme-b-n3",
  zIndex: 0,
  position: "relative",
  cursor: "pointer",

  "@md": {
    paddingY: "$8",
    borderBottom: "none",
  },

  hover: {
    backgroundColor: "$theme-n2-n7",
  },

  keyboardFocus: {
    backgroundColor: "$theme-n2-n7",
  },

  lastOfType: {
    borderBottom: "none",
  },
})
