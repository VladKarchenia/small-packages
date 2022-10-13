import { objectReduce } from "fast-loops"
import deepmerge from "deepmerge"

import { CSS } from "@/config"

import { ResponsiveProp } from "../types"

export * from "./animations"
// export * from "./boxShadows";
export * from "./classes"
export * from "./colors"
export * from "./easing"

type CSSSelector =
  | "hover"
  | "focus"
  | "keyboardFocus"
  | "focusWithin"
  | "active"
  | "disabled"
  | "before"
  | "after"
  | "placeholder"
  | "firstChild"
  | "firstOfType"
  | "firstLetter"
  | "lastChild"
  | "lastOfType"
  | "onlyChild"

export const multipleSelectors = (selectors: CSSSelector[], value: CSS) => {
  const styles = {} as Record<CSSSelector, CSS>

  selectors.forEach((selector) => {
    styles[selector] = value
  })

  return styles
}

export const getStyleFromResponsiveProp = <T>(
  prop: T | ResponsiveProp<T> | undefined,
  callbackFn: (value: T, key: keyof ResponsiveProp<T>) => {},
) => {
  if (!prop) {
    return {}
  }

  if (
    typeof prop === "number" ||
    typeof prop === "string" ||
    typeof prop === "boolean" ||
    Array.isArray(prop)
  ) {
    return callbackFn(prop, "@initial")
  } else {
    return objectReduce(
      prop,
      (total: {}, value: T, key: keyof ResponsiveProp<T>) => ({
        ...total,
        ...(key === "@initial" ? callbackFn(value, key) : { [key]: callbackFn(value, key) }),
      }),
      {},
    )
  }
}

export const mergeCSSObjects = (x: CSS, y: CSS): CSS => {
  const styles: CSS = deepmerge(x, y)

  const sortedStyles = Object.keys(styles)
    .sort((a, b) => b.localeCompare(a))
    .reduce((acc: CSS, key) => {
      acc[key] = styles[key]
      return acc
    }, {})

  return sortedStyles
}
