import { ComponentProps } from "@/stitches/types"

import { Title, TypographyScale } from "@/shared/components"

import { SStepperHeader } from "./Stepper.styles"

export interface IStepperHeaderProps extends ComponentProps<typeof SStepperHeader> {
  scale?: TypographyScale
  thin?: boolean
}

export const StepperHeader = ({
  children,
  scale = 6,
  thin = false,
  ...props
}: IStepperHeaderProps) => {
  return (
    <SStepperHeader data-ui="stepper-header" data-testid="stepper-header" {...props}>
      <Title as="h4" scale={scale} thin={thin} css={{ width: "100%" }}>
        {children}
      </Title>
    </SStepperHeader>
  )
}
