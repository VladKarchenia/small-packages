import { Copy } from "@/shared/components"

import { SStepperIcon } from "./Stepper.styles"

export interface IStepperIconProps {
  stepNumber: number
}

export const StepperIcon = ({ stepNumber }: IStepperIconProps) => {
  return (
    <SStepperIcon data-ui="stepper-icon" data-testid="stepper-icon">
      <Copy scale={8} fontWeight="bold">
        {stepNumber}
      </Copy>
    </SStepperIcon>
  )
}
