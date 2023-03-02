import React, { useCallback, useEffect, useRef, useState } from "react"

import { createContext } from "@/shared/utils"
import { ComponentProps } from "@/stitches/types"

import { SStepper } from "./Stepper.styles"

type StepperContextValue = {
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>

  disabled: boolean

  completed: boolean

  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [StepperProvider, useStepperContext] = createContext<StepperContextValue>("Stepper")

export interface IStepperProps extends ComponentProps<typeof SStepper> {
  /**
   * Array of Stepper Item value(s) to be open by default
   */
  defaultSelected?: string[]

  disabled?: boolean
  /**
   * Enable multiple panels open
   */
  multiple?: boolean
  /**
   * Callback with an array of string values of the Stepper Items
   */
  onSelectedChange?: (selected: string[]) => void

  completed?: boolean
}

export const Stepper = ({
  defaultSelected = [],
  disabled = false,
  multiple,
  onSelectedChange,
  completed = false,
  ...props
}: IStepperProps) => {
  const [selected, setSelected] = useState(defaultSelected)
  const selectedRef = useRef(selected)

  const handleItemOpen = useCallback(
    (itemValue: string) =>
      !multiple
        ? setSelected([itemValue])
        : setSelected((prevValue = []) => [...prevValue, itemValue]),
    [multiple, setSelected],
  )

  const handleItemClose = useCallback(
    (itemValue: string) =>
      !multiple
        ? setSelected([])
        : setSelected((prevValue = []) => prevValue.filter((value) => value !== itemValue)),
    [multiple, setSelected],
  )

  useEffect(() => {
    if (selected !== selectedRef.current) {
      selectedRef.current = selected

      onSelectedChange && onSelectedChange(selected)
    }
  }, [onSelectedChange, selected])

  return (
    <StepperProvider
      selected={selected}
      setSelected={setSelected}
      disabled={disabled}
      completed={completed}
      onItemOpen={handleItemOpen}
      onItemClose={handleItemClose}
    >
      <SStepper data-ui="stepper" data-testid="stepper" {...props} />
    </StepperProvider>
  )
}
