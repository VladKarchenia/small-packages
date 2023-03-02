import { styled } from "@/stitches/config"

export const SFlex = styled("div", {
  display: "flex",

  variants: {
    direction: {
      column: { flexDirection: "column" },
      columnReverse: { flexDirection: "column-reverse" },
      row: { flexDirection: "row" },
      rowReverse: { flexDirection: "row-reverse" },
    },

    wrap: {
      true: { flexWrap: "wrap" },
      false: { flexWrap: "nowrap" },
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

  defaultVariants: {
    direction: "row",
    wrap: "false",
  },
})
