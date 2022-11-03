import { styled } from "@/config"
import { ComboboxMenu, ComboboxItem } from "@/shared/components"

export const SDestinationComboboxMenu = styled(ComboboxMenu, {
  marginTop: "$16",

  "@md": {
    marginTop: 0,
  },
})

export const SDestinationComboboxItem = styled(ComboboxItem, {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  paddingY: "$16",
  borderBottom: "1px solid $neutrals-4",
  position: "relative",
  zIndex: "0",

  "@md": {
    paddingY: "$8",
    borderBottom: "none",
    before: {
      content: "",
      position: "absolute",
      zIndex: "-$1",
      top: 0,
      right: "0",
      height: "100%",
      backgroundColor: "$brand-yellow-lighter",
      opacity: 0,
      transition: "100ms opacity",
      left: "-$24",
      marginRight: "-$24",
    },
  },

  "&[data-state='highlighted']::before": {
    opacity: 1,
  },
})

export const SComboboxClearButton = styled("button", {
  reset: true,
  backgroundColor: "$neutrals-2",
  borderRadius: "$rounded",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$24",
  width: "$24",
  cursor: "pointer",
})
