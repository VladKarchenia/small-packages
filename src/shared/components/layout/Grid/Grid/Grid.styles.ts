import { styled } from "@/config"

/**
 * If needed we can add missing CSS grid properties such as `grid-auto-flow` through a Stitches variant
 */
export const SGrid = styled("div", {
  display: "grid",

  variants: {
    gap: {
      0: { gap: 0 },
      8: { gap: "$8" },
      16: { gap: "$16" },
      24: { gap: "$24" },
      32: { gap: "$32" },
      48: { gap: "$48" },
      64: { gap: "$64" },
    },

    columnGap: {
      0: { columnGap: 0 },
      8: { columnGap: "$8" },
      16: { columnGap: "$16" },
      24: { columnGap: "$24" },
      32: { columnGap: "$32" },
      48: { columnGap: "$48" },
      64: { columnGap: "$64" },
    },

    rowGap: {
      0: { rowGap: 0 },
      8: { rowGap: "$8" },
      16: { rowGap: "$16" },
      24: { rowGap: "$24" },
      32: { rowGap: "$32" },
      48: { rowGap: "$48" },
      64: { rowGap: "$64" },
    },

    align: {
      baseline: { alignItems: "baseline" },
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      around: { alignItems: "space-around" },
      between: { alignItems: "space-between" },
      evenly: { alignItems: "space-evenly" },
      stretch: { alignItems: "stretch" },
    },

    justify: {
      baseline: { justifyContent: "baseline" },
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      around: { justifyContent: "space-around" },
      between: { justifyContent: "space-between" },
      evenly: { justifyContent: "space-evenly" },
      stretch: { justifyContent: "stretch" },
    },
  },
})
