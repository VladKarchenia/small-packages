import { styled } from "@/config"

export const SFlexItem = styled("div", {
  variants: {
    align: {
      baseline: { alignSelf: "baseline" },
      center: { alignSelf: "center" },
      start: { alignSelf: "flex-start" },
      end: { alignSelf: "flex-end" },
      around: { alignSelf: "space-around" },
      between: { alignSelf: "space-between" },
      evenly: { alignSelf: "space-evenly" },
      stretch: { alignSelf: "stretch" },
    },

    order: {
      first: { order: -1 },
      middle: { order: 0 },
      last: { order: 1 },
    },
  },
})
