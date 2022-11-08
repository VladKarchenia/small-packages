import { styled } from "@/config"
import { Flex } from "@/shared/components"

export const SFooterWrap = styled(Flex, {
  padding: "$16 $24",
  "@md": {
    padding: "$16 $32",
  },
  variants: {
    divider: {
      true: {
        borderTop: "1px solid $neutrals-2",
      },
    },
  },
})

export const SDatesInputContent = styled("div", {
  width: "100%",
  maxWidth: "480px",
  overflow: "hidden auto",
  paddingY: 0,
  margin: "0 auto",

  /* Change default DayPicker styles */
  ".my-selected:not([disabled]):not(.rdp-day_selected)": {
    border: "2px solid currentColor",
    backgroundColor: "$system-black",
    color: "$system-white",
  },

  ".rdp-button:hover:not([disabled]):not(.rdp-day_selected)": {
    borderColor: "currentColor",
    color: "$system-white",
    "--rdp-background-color": "var(--colors-neutrals-6)",
  },

  ".rdp-month, .rdp-table": {
    width: "100%",
    maxWidth: "100%",
  },

  "@xs": {
    ".rdp": {
      "--rdp-cell-size": "var(--space-48)",
    },
  },

  "@md": { paddingX: 0, maxWidth: "100%", margin: "0 auto", border: "none" },
})
