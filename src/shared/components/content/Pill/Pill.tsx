import React, { forwardRef } from "react"

import { ComponentProps } from "@/stitches/types"

import { Copy, Spacer } from "@/shared/components"

import { SPill, SSelectedDot } from "./Pill.styles"

export interface IPillProps extends Omit<ComponentProps<typeof SPill>, "prefix"> {
  children: React.ReactNode

  prefix?: React.ReactNode
  suffix?: React.ReactNode

  selected?: boolean
  active?: boolean
  withDot?: boolean
}

export const Pill = forwardRef<HTMLButtonElement, IPillProps>(
  (
    { children, prefix, suffix, selected = false, active = false, withDot = false, ...props },
    ref,
  ) => {
    const copyScale = getCopyScaleFromPillSize(props.size)

    return (
      <SPill ref={ref} type="button" selected={selected} active={active} {...props}>
        {prefix && (
          <>
            {prefix}
            <Spacer size={4} horizontal />
          </>
        )}

        <Copy as="span" scale={copyScale}>
          {children}
        </Copy>

        {withDot && selected ? <SSelectedDot /> : null}

        {suffix && (
          <>
            <Spacer size={4} horizontal />
            {suffix}
          </>
        )}
      </SPill>
    )
  },
)

Pill.displayName = "Pill"

function getCopyScaleFromPillSize(size: IPillProps["size"]) {
  function getValue(value?: string) {
    switch (value) {
      case "small":
      default:
        return 10
      case "medium":
        return 8
      case "large":
        return 7
    }
  }

  if (typeof size === "object") {
    return Object.keys(size).reduce((acc, key) => {
      acc[key] = getValue(size[key])

      return acc
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any)
  }

  return getValue(size)
}
