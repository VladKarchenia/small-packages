import { ComponentProps } from "@/stitches/types"

import { SStepperHeader } from "./Stepper.styles"

export interface IStepperHeaderProps extends ComponentProps<typeof SStepperHeader> {
  isStepLast: boolean
}

export const StepperHeader = ({ children, isStepLast }: IStepperHeaderProps) => {
  return (
    <SStepperHeader data-ui="stepper-header" data-testid="stepper-header" last={isStepLast}>
      {children}
    </SStepperHeader>
  )
}
