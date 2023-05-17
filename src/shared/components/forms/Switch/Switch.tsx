import React, { ChangeEventHandler, useCallback, useRef } from "react"

import { enterKeyDown } from "@/shared/utils"

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

  // We need this "selected" value if we want to control the position of the switch indicator
  // const [selected, setSelected] = useState<HTMLLabelElement>(
  //   document.querySelector(`[data-switch-option="${value}"]`) as HTMLLabelElement,
  // )

  const isChecked = useCallback((props: SwitchOptionProps) => props.value === value, [value])

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => onValueChange(event.target.value as T),
    [onValueChange],
  )

  // useEffect(() => {
  //   setSelected(document.querySelector(`[data-switch-option="${value}"]`) as HTMLLabelElement)
  // }, [value])

  return (
    <SSwitch
      ref={ref}
      checked={checked}
      onKeyDown={(e) => {
        enterKeyDown(e.key) && e.preventDefault()
      }}
    >
      {React.Children.map(
        children,
        (child) =>
          React.isValidElement(child) &&
          React.cloneElement(child as React.ReactElement, {
            name,
            checked: isChecked(child.props),
            onChange,
          }),
      )}
      {/* <SwitchIndicator selected={selected} checked={checked} /> */}
      <SwitchIndicator checked={checked} />
    </SSwitch>
  )
}
