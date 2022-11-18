import { styled, CSS } from "@/config"

const editorialVariant = {
  true: { fontFamily: "$serif" },
  false: { fontFamily: "$sans" },
}

const fontSizeLineHeightMap: any = {
  6: "16px",
  11: "16px",
  12: "18px",
  13: "20px",
  14: "22px",
  16: 1.5,
  18: "28px",
  20: "28px",
  24: "32px",
  28: "32px",
  32: "40px",
  40: "48px",
  48: "56px",
  56: "64px",
  64: "72px",
  72: "80px",
  80: "88px",
  104: "112px",
}

const getScaleVariantStyles = (fontSize: number) => {
  const lineHeight = fontSizeLineHeightMap[fontSize]

  return {
    fontSize,
    lineHeight,
  }
}

const scaleVariantMap: any = {
  0: {
    ...getScaleVariantStyles(48),

    "@sm": getScaleVariantStyles(56),
    "@lg": getScaleVariantStyles(72),
    "@xxl": getScaleVariantStyles(80),
  },
  1: {
    ...getScaleVariantStyles(40),

    "@sm": getScaleVariantStyles(48),
    "@lg": getScaleVariantStyles(56),
    "@xxl": getScaleVariantStyles(72),
  },
  2: {
    ...getScaleVariantStyles(32),

    "@sm": getScaleVariantStyles(40),
    "@lg": getScaleVariantStyles(48),
  },
  3: {
    ...getScaleVariantStyles(24),

    "@sm": getScaleVariantStyles(32),
    "@lg": getScaleVariantStyles(40),
  },
  4: {
    ...getScaleVariantStyles(24),

    "@sm": getScaleVariantStyles(32),
  },
  5: {
    ...getScaleVariantStyles(20),

    "@sm": getScaleVariantStyles(24),
  },
  6: {
    ...getScaleVariantStyles(20),
  },
  7: {
    ...getScaleVariantStyles(18),
  },
  8: {
    ...getScaleVariantStyles(16),
  },
  9: {
    ...getScaleVariantStyles(14),
  },
  10: {
    ...getScaleVariantStyles(13),
  },
  11: {
    ...getScaleVariantStyles(12),
  },
  12: {
    ...getScaleVariantStyles(11),
  },
  13: {
    ...getScaleVariantStyles(6),
  },
}

const trackingVariant = {
  tight: { letterSpacing: 0 },
  normal: { letterSpacing: "0.5px" },
  wide: { letterSpacing: "1.5px" },
  wider: { letterSpacing: "2px" },
}

export const commonVariants = {
  editorial: editorialVariant,
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
    13: {},
  },
  tracking: trackingVariant,
}

export type TypographyScale = keyof typeof commonVariants.scale

export const Text = styled("p", {
  fontFamily: "$sans",
  fontStyle: "normal",
  fontStretch: "normal",
  letterSpacing: "0.5px",
  lineHeight: 1.5,

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
