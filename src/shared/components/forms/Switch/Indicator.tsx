import React, { memo, useState } from "react"

import { useResizeObserver } from "@/shared/hooks"

import { SSwitchIndicator } from "./Indicator.styles"

export interface SwitchIndicatorProps {
  selected: HTMLLabelElement | null
  checked?: boolean
}

export const SwitchIndicator = memo(function ({ selected, checked }: SwitchIndicatorProps) {
  const [style, setStyle] = useState({})

  useResizeObserver(selected, ([entry]) => {
    const target = entry.target as HTMLLabelElement

    setStyle({
      transform: `translateX(${checked ? target.offsetLeft : target.offsetLeft - 4}px)`,
    })
  })

  return <SSwitchIndicator style={style} checked={checked} />
})

SwitchIndicator.displayName = "SwitchIndicator"
