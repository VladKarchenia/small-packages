import { Box, Copy, Flex } from "@/shared/components"
import { IconDot, IconTick, IconClock } from "@/shared/icons"

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRoutePointProps {
  data: RouteInfo
  isLastStep: boolean
  stepName: string
  isCompleted: boolean
  isAwaiting: boolean
}

export const ShipmentRoutePoint = ({
  data,
  isLastStep,
  stepName,
  isCompleted,
  isAwaiting,
}: IShipmentRoutePointProps) => {
  const stepBackgroundColor = isCompleted || isAwaiting ? "$neutrals-7" : "$neutrals-5"
  const stepStyles = isLastStep
    ? { paddingBottom: "$32", position: "relative" }
    : {
        paddingBottom: "$32",
        position: "relative",
        "&:before": {
          content: "",
          position: "absolute",
          top: "var(--space-14)",
          bottom: "var(--space-8)",
          margin: "auto",
          height: "calc(100% - 40px)",
          borderRight: "1px dashed black",
          left: "8px",
        },
      }

  return (
    <Flex align="start" css={stepStyles}>
      <Flex>
        <Flex
          css={{
            width: "20px",
            height: "20px",
            backgroundColor: stepBackgroundColor,
            borderRadius: "50%",
            marginRight: "$8",
            color: "$system-white",
          }}
          align="center"
          justify="center"
        >
          {isCompleted ? (
            <IconTick size="xs" />
          ) : isAwaiting ? (
            <IconClock size="xs" />
          ) : (
            <IconDot width={8} height={8} />
          )}
        </Flex>
        <Box>
          <Copy scale={8} color="system-black" bold>
            {stepName}
          </Copy>
          <Copy scale={9} color="neutrals-7" bold>
            {data?.date}
          </Copy>
        </Box>
      </Flex>
    </Flex>
  )
}
