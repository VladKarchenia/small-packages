import { css } from "@/stitches/config"
import { ResponsiveProp, Spaces } from "@/stitches/types"
import { getStyleFromResponsiveProp } from "@/stitches/utils"

function getSpacingKey(
  horizontal: boolean | ResponsiveProp<boolean>,
  key: keyof ResponsiveProp<boolean>,
) {
  const value = typeof horizontal === "boolean" ? horizontal : horizontal?.[key]

  return value ?? "vSpace" ? "hSpace" : "vSpace"
}

export const applySpacerClassName = (
  size: Spaces | ResponsiveProp<Spaces>,
  horizontal: boolean | ResponsiveProp<boolean>,
  variants?: {
    inline?: boolean | ResponsiveProp<boolean>
  },
) =>
  css({
    ...getStyleFromResponsiveProp(size, (value, key) => ({
      [getSpacingKey(horizontal, key)]: value,
    })),

    variants: {
      inline: {
        false: { display: "block" },
        true: { display: "inline-block" },
      },
    },
  })(variants)
