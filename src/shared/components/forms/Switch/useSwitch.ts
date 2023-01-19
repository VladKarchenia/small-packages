import { useState } from "react"

import { SwitchProps } from "."

export function useSwitch<T extends string>(
  name: string,
  initialValue: T,
): Omit<SwitchProps<T>, "children"> {
  const [value, setValue] = useState(initialValue)

  return {
    name,
    value,
    onValueChange: setValue,
  }
}
