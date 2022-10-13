import { objectReduce, objectFilter } from "fast-loops"

import { breakpoints } from "@/config"

import { ResponsiveProp } from "@/utils"

function getValue<T>(value: T, key: keyof ResponsiveProp<string>) {
  return key === "@initial" && typeof value !== "object" ? value : value?.[key as keyof T]
}

export function getGridCoords<T>(colValue: T, rowValue: T) {
  if (!colValue && !rowValue) return

  const coords: ResponsiveProp<[T, T]> = objectReduce(
    breakpoints,
    (acc, _, key) => ({
      ...acc,
      [`@${key}`]: [getValue(colValue, `@${key}`), getValue(rowValue, `@${key}`)],
    }),
    {},
  )

  return objectFilter(coords, (value) => value.filter(Boolean).length > 0)
}
