import { styled } from "@/config"
import { ComboboxMenu, ComboboxItem, Combobox } from "@/shared/components"

export const SCombobox = styled(Combobox, {
  height: "100%",
})

export const SSearchFilterComboboxMenu = styled(ComboboxMenu, {
  height: `calc(100% - $48)`,
  marginTop: "$20",
  overflow: "auto",
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
