import { createStitches, defaultThemeMap } from "@stitches/react"

import type * as Stitches from "@stitches/react"

import { theme } from "./theme"
import { mediaQueries, MediaQuery } from "./responsive"

export const stitchesConfig = createStitches({
  theme,
  themeMap: {
    ...defaultThemeMap,
    width: "space",
    minWidth: "space",
    maxWidth: "space",
    height: "space",
    minHeight: "space",
    maxHeight: "space",
    flexBasis: "space",
    borderWidth: "space",
    transform: "space",
  },
  utils: {
    reset: (value: boolean) =>
      value
        ? {
            WebkitTapHighlightColor: "transparent",
            appearance: "none",
            "-webkit-appearance": "none",
            background: "transparent",
            border: 0,
            borderRadius: 0,
            margin: 0,
            padding: 0,
            textDecoration: "none",
          }
        : {},

    fontSmoothing: (value: boolean) =>
      value
        ? {
            "-moz-osx-font-smoothing": "grayscale",
            "-webkit-font-smoothing": "antialiased",
          }
        : {},

    hiddenInput: (value: boolean) =>
      value
        ? {
            opacity: 0,
            position: "absolute",
            clip: "rect(0px, 0px, 0px, 0px)",
          }
        : {},

    srOnly: (value: boolean) =>
      value
        ? {
            clip: "rect(1px, 1px, 1px, 1px)",
            height: 1,
            width: 1,
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
          }
        : {},

    marginX: (value: Stitches.PropertyValue<"margin">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: Stitches.PropertyValue<"margin">) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: Stitches.PropertyValue<"padding">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: Stitches.PropertyValue<"padding">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    hSpace: (value: Stitches.ScaleValue<"space">) => ({
      width: value,
      minWidth: value,
      height: 1,
      minHeight: 1,
    }),
    vSpace: (value: Stitches.ScaleValue<"space">) => ({
      width: 1,
      minWidth: 1,
      height: value,
      minHeight: value,
    }),
    translateX: (value: Stitches.ScaleValue<"space">) => ({
      transform: `translateX(${value}px)`,
    }),
    translateY: (value: Stitches.ScaleValue<"space">) => ({
      transform: `translateY(${value}px)`,
    }),
    scaleX: (value: number) => ({
      transform: `scaleX(${value})`,
    }),
    scaleY: (value: number) => ({
      transform: `scaleY(${value})`,
    }),

    hover: (value: Stitches.CSS) => ({
      "&:hover": value,
    }),
    focus: (value: Stitches.CSS) => ({
      "&:focus": value,
    }),
    focusWithin: (value: Stitches.CSS) => ({
      "&:focus-within": value,
    }),
    /**
     * This will remove the focus outline and then apply these styles
     * whenever the element was focused with a keyboard
     */
    keyboardFocus: (value: Stitches.CSS) => ({
      "&:focus": { outline: "none" },
      ".has-focus &:focus": value,
    }),
    /**
     * This will apply styles whenever the direct parent has been focused by a keyboard user
     */
    parentKeyboardFocus: (value: Stitches.CSS) => ({
      ".has-focus :focus > &": value,
    }),

    active: (value: Stitches.CSS) => ({
      "&:active": value,
    }),
    disabled: (value: Stitches.CSS) => ({
      "&:disabled": value,
    }),
    checked: (value: Stitches.CSS) => ({
      "&:checked": value,
    }),
    before: (value: Stitches.CSS) => ({
      "&::before": value,
    }),
    after: (value: Stitches.CSS) => ({
      "&::after": value,
    }),
    placeholder: (value: Stitches.CSS) => ({
      "&::placeholder": value,
    }),

    firstChild: (value: Stitches.CSS) => ({
      "&:first-child": value,
    }),
    firstOfType: (value: Stitches.CSS) => ({
      "&:first-of-type": value,
    }),
    firstLetter: (value: Stitches.CSS) => ({
      "&:first-letter": value,
    }),
    lastChild: (value: Stitches.CSS) => ({
      "&:last-child": value,
    }),
    lastOfType: (value: Stitches.CSS) => ({
      "&:last-of-type": value,
    }),
    onlyChild: (value: Stitches.CSS) => ({
      "&:only-child": value,
    }),
  },
  media: Object.keys(mediaQueries).reduce(
    (total, key) => ({
      ...total,
      [key]: mediaQueries[key as MediaQuery],
    }),
    {},
  ),
})

export const { styled, css, globalCss, keyframes, getCssText } = stitchesConfig

export type StitchesConfig = typeof stitchesConfig

export type CSS = Stitches.CSS<StitchesConfig>
