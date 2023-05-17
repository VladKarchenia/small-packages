import { createContext } from "@/shared/utils"
import { ComponentProps } from "@/stitches/types"

import { useStepperContext } from "./Stepper"
import { SStepperItem } from "./Stepper.styles"

type StepperItemContextValue = {
  id: string
  value: string
  open: boolean
  disabled: boolean
  completed: boolean
}

export const [StepperItemProvider, useStepperItemContext] =
  createContext<StepperItemContextValue>("StepperItem")

export interface IStepperItemProps extends ComponentProps<typeof SStepperItem> {
  /**
   * An identifier for the component to know which Stepper Item is open
   */
  value: string
  /**
   * Disable the Stepper Item
   */
  isDisabled?: boolean
  isCompleted?: boolean
}

export const StepperItem = ({ value, isDisabled, isCompleted, ...props }: IStepperItemProps) => {
  const { selected, disabled, completed } = useStepperContext("StepperItem")

  const isOpen = selected.includes(value) || false
  const isStepDisabled = disabled || isDisabled || false
  const isStepCompleted = completed || isCompleted || false

  return (
    <StepperItemProvider
      id={value}
      value={value}
      open={isOpen}
      disabled={isStepDisabled}
      completed={isStepCompleted}
    >
      <SStepperItem
        data-ui="stepper-item"
        data-state={isOpen ? "open" : "closed"}
        data-testid="stepper-item"
        inactive={isStepDisabled}
        {...props}
      />
    </StepperItemProvider>
  )
}
