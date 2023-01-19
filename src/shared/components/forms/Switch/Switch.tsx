import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react"

import type { SwitchOptionProps } from "./Option"
import { SwitchIndicator } from "./Indicator"

import { SSwitch } from "./Switch.styles"

export interface SwitchProps<T> {
  children: React.ReactNode

  name: string
  value: T

  onValueChange: (value: T) => void

  checked?: boolean
}

export const Switch = <T extends string>({
  name,
  value,
  onValueChange,
  checked,
  children,
}: SwitchProps<T>) => {
  const ref = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<HTMLLabelElement | null>(null)

  const isChecked = useCallback((props: SwitchOptionProps) => props.value === value, [value])

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => onValueChange(e.target.value as T),
    [onValueChange],
  )

  useEffect(() => {
    setSelected(document.querySelector(`[data-switch-option="${value}"]`) as HTMLLabelElement)
  }, [value])

  return (
    <SSwitch ref={ref} checked={checked}>
      {React.Children.map(
        children,
        (child) =>
          React.isValidElement(child) &&
          React.cloneElement<any>(child, {
            name,
            checked: isChecked(child.props),
            onChange,
          }),
      )}
      <SwitchIndicator selected={selected} checked={checked} />
    </SSwitch>
  )
}
