import { styled } from "@/stitches/config"

import { ComboboxMenu, Combobox } from "@/shared/components"

export const SCombobox = styled(Combobox, {
  height: "100%",
})

export const SComboboxMenu = styled(ComboboxMenu, {
  // TODO: do we need this height? Maybe for the "Reset" and "Apply" buttons?
  // height: `calc(100% - $48)`,
  marginTop: "$20",
  overflow: "auto",
})

export const SComboboxClearButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "$24",
  width: "$24",
  cursor: "pointer",
})
