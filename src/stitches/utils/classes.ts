import { css } from "@/stitches/config"
import { theme } from "@/stitches/theme"
import { Colors } from "@/stitches/types"

const generateColorVariant = (property: string) => {
  return Object.keys(theme.colors).reduce(
    (total, name) => ({
      ...total,
      [name]: {
        [property]: `$${name}`,
      },
    }),
    {} as Record<Colors, Record<string, never>>,
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
      regular: { fontWeight: 400 },
      medium: { fontWeight: 500 },
      semiBold: { fontWeight: 600 },
      bold: { fontWeight: 700 },
      black: { fontWeight: 900 },
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
