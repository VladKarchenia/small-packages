import { css } from "@/config"
import { Spaces } from "@/config/theme/spacing"
import { getStyleFromResponsiveProp, ResponsiveProp } from "@/utils"

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
