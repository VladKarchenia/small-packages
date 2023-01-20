import { styled } from "@/config"
import { ComboboxMenu, ComboboxItem, Combobox } from "@/shared/components"

export const SCombobox = styled(Combobox, {
  height: "100%",
})

export const SComboboxMenu = styled(ComboboxMenu, {
  height: `calc(100% - $48)`,
  marginTop: "$20",
  overflow: "auto",
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
  },

  lastOfType: {
    borderBottom: "none",
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
