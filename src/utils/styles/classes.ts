import { css, theme } from "@/config"

import { Colors } from "@/config/theme/types"

const generateColorVariant = (property: string) => {
  return Object.keys(theme.colors).reduce(
    (total, name) => ({
      ...total,
      [name]: {
        [property]: `$${name}`,
      },
    }),
    {} as Record<Colors, any>,
  )
}

const backgroundColorVariant = generateColorVariant("backgroundColor")
const colorVariant = generateColorVariant("color")

/**
 * ### Examples of usage:
 * 1. direct
 * ```tsx
 *   <div className={atomicClassNames({ textAlign: { "@initial": "left", "@md": "center" } })}>
 *     I will be left aligned on mobile and center aligned on md and up
 *   </div>
 * ```
 *
 * 2. with `classnames` package
 * ```tsx
 *   <div
 *     className={cx(
 *       atomicClassNames({ textAlign: { "@initial": "left", "@md": "center" } }).toString(),
 *       "some-other-classname",
 *       "yet another"
 *     )}
 *   >
 *     I will be left aligned on mobile and center aligned on md and up
 *   </div>
 * ```
 */
export const atomicClassNames = css({
  variants: {
    fontWeight: {
      bold: { fontWeight: 500 },
      normal: { fontWeight: 400 },
    },
    textAlign: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },

    display: {
      block: { display: "block" },
      flex: { display: "flex" },
      grid: { display: "grid" },
      inline: { display: "inline" },
      "inline-block": { display: "inline-block" },
      "inline-flex": { display: "inline-flex" },
      "inline-grid": { display: "inline-grid" },
      none: { display: "none" },
    },

    backgroundColor: backgroundColorVariant,
    color: colorVariant,
  },
})
