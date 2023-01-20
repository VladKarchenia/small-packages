import { IStep } from "@/shipment"

import {
  Copy,
  Flex,
  Spacer,
  StepperButton,
  StepperHeader,
  StepperItem,
  StepperPanel,
} from "@/shared/components"
import { IconTick } from "@/shared/icons"

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
      <StepperHeader scale={8}>
        <StepperButton
          size="small"
          compact
          css={{
            paddingY: "$8",

            hover: {
              backgroundColor: "$neutrals-0",
            },
          }}
        >
          <Flex align="center">
            <Flex
              align="center"
              justify="center"
              css={{
                height: "$20",
                width: "$20",
                minWidth: "$20",
                borderRadius: "$rounded",
                backgroundColor: "$system-black",
                color: "$neutrals-0",
              }}
            >
              {completed ? (
                <IconTick size="xs" />
              ) : (
                <Copy scale={10} color="neutrals-0" bold>
                  {stepNumber}
                </Copy>
              )}
            </Flex>
            <Spacer size={12} horizontal />
            {title}
          </Flex>
        </StepperButton>
      </StepperHeader>
      <StepperPanel mainContent={mainContent} isStepLast={isStepLast} />
    </StepperItem>
  )
}
