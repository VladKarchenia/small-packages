import React, { memo } from "react"

import { SSwitchIndicator } from "./Switch.styles"

export interface SwitchIndicatorProps {
  //   selected: HTMLLabelElement | null
  checked?: boolean
}

export const SwitchIndicator = memo(function ({ checked }: SwitchIndicatorProps) {
  // const [style, setStyle] = useState({})

  // useResizeObserver(selected, ([entry]) => {
  //   const target = entry.target as HTMLLabelElement

  //   setStyle({
  //     transform: `translateX(${checked ? target.offsetLeft : target.offsetLeft - 4}px)`,
  //   })
  // })

  // return <SSwitchIndicator style={style} checked={checked} />
  return <SSwitchIndicator checked={checked} />
})

SwitchIndicator.displayName = "SwitchIndicator"
