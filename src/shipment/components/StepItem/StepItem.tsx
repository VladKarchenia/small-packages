import { IStep } from "@/shipment/types"

import {
  Copy,
  Flex,
  StepperButton,
  StepperHeader,
  StepperIcon,
  StepperItem,
  StepperPanel,
} from "@/shared/components"

interface IStepperItemProps {
  title: string
  data: IStep
  mainContent: React.ReactNode
  totalSteps: number
}

export const StepItem = ({ title, data, mainContent, totalSteps }: IStepperItemProps) => {
  const { name, disabled, stepNumber, completed } = data
  const isStepLast = data.stepNumber === totalSteps

  return (
    <StepperItem value={name} isDisabled={disabled} isCompleted={completed}>
      <StepperHeader isStepLast={isStepLast}>
        <StepperButton size="small" compact>
          <Flex
            align="center"
            direction={{ "@initial": "row", "@sm": "column" }}
            css={{ gap: "$12" }}
          >
            <StepperIcon stepNumber={stepNumber} />
            <Copy color={"system-inherit"} fontWeight="bold">
              {title}
            </Copy>
          </Flex>
        </StepperButton>
      </StepperHeader>
      <StepperPanel mainContent={mainContent} isStepLast={isStepLast} />
    </StepperItem>
  )
}
