import { styled, CSS } from "@/stitches/config"

const fontSizeLineHeightMap: { [key: string]: string } = {
  11: "16px",
  12: "18px",
  13: "20px",
  14: "22px",
  15: "22px",
  16: "24px",
  17: "26px",
  18: "28px",
  20: "30px",
  25: "34px",
  35: "42px",
  48: "56px",
}

const getScaleVariantStyles = (fontSize: number) => {
  const lineHeight = fontSizeLineHeightMap[fontSize]

  return {
    fontSize,
    lineHeight,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scaleVariantMap: any = {
  0: {
    ...getScaleVariantStyles(48),
  },
  1: {
    ...getScaleVariantStyles(25),

    "@sm": getScaleVariantStyles(35),
  },
  2: {
    ...getScaleVariantStyles(25),
  },
  3: {
    ...getScaleVariantStyles(17),

    "@sm": getScaleVariantStyles(20),
  },
  4: {
    ...getScaleVariantStyles(16),
  },
  5: {
    ...getScaleVariantStyles(15),

    "@sm": getScaleVariantStyles(18),
  },
  6: {
    ...getScaleVariantStyles(15),

    "@sm": getScaleVariantStyles(16),
  },
  7: {
    ...getScaleVariantStyles(15),
  },
  8: {
    ...getScaleVariantStyles(14),
  },
  9: {
    ...getScaleVariantStyles(13),

    "@sm": getScaleVariantStyles(16),
  },
  10: {
    ...getScaleVariantStyles(13),

    "@sm": getScaleVariantStyles(14),
  },
  11: {
    ...getScaleVariantStyles(12),
  },
  12: {
    ...getScaleVariantStyles(11),
  },
}

const trackingVariant = {
  tight: { letterSpacing: 0 },
  normal: { letterSpacing: "0.5px" },
  wide: { letterSpacing: "1.5px" },
  wider: { letterSpacing: "2px" },
}

export const commonVariants = {
  scale: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
  },
  tracking: trackingVariant,
}

export type TypographyScale = keyof typeof commonVariants.scale

export const Text = styled("p", {
  variants: {
    ...commonVariants,

    lineBreak: {
      true: {
        whiteSpace: "pre-wrap",
      },
    },
  },

  compoundVariants: [
    ...Object.keys(scaleVariantMap).reduce<
      {
        scale: TypographyScale
        css: CSS
      }[]
    >((acc, scale) => {
      acc.push({
        scale: Number(scale) as TypographyScale,
        css: scaleVariantMap[scale],
      })
      return acc
    }, []),
  ],
})
