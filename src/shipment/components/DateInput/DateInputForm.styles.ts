import { styled } from "@/stitches/config"

export const SDatesInputContent = styled("div", {
  width: "100%",
  maxWidth: 480,
  overflow: "hidden auto",
  paddingY: 0,
  margin: "0 auto",

  /* Change default DayPicker styles */
  ".rdp-day_selected:not([disabled])": {
    border: "2px solid currentColor",
    backgroundColor: "var(--colors-neutrals-12)",
    color: "var(--colors-neutrals-0)",
  },

  ".rdp-button:hover:not([disabled])": {
    borderColor: "currentColor",
    color: "var(--colors-neutrals-0)",
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
