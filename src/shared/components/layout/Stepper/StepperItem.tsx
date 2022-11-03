import { createContext, ComponentProps } from "@/utils"
import { useId } from "@/shared/hooks"

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
  disabled?: boolean
  completed?: boolean
}

export const StepperItem = ({ value, ...props }: IStepperItemProps) => {
  const { selected, disabled, completed } = useStepperContext("StepperItem")

  const id = useId(8)

  const isOpen = selected.includes(value) || false
  const isDisabled = disabled || props.disabled || false
  const isCompleted = completed || props.completed || false

  return (
    <StepperItemProvider
      id={id}
      value={value}
      open={isOpen}
      disabled={isDisabled}
      completed={isCompleted}
    >
      <SStepperItem
        data-ui="stepper-item"
        data-state={isOpen ? "open" : "closed"}
        data-testid="stepper-item"
        inactive={isDisabled}
        {...props}
      />
    </StepperItemProvider>
  )
}
