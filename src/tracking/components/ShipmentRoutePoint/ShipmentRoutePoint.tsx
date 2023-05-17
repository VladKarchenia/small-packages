import { ShipmentStatus } from "@/shared/types"

import { Box, Copy, Spacer } from "@/shared/components"
import { IconTick, IconClock, IconCross } from "@/shared/icons"

import { SDot, SRoutePointIcon, SRoutePointWrapper } from "./ShipmentRoutePoint.styles"

interface IShipmentRoutePointProps {
  status: string
  date?: string
  isStepCompleted?: boolean
  isStepInProgress?: boolean
}

export const ShipmentRoutePoint = ({
  status,
  date,
  isStepCompleted = false,
  isStepInProgress = false,
}: IShipmentRoutePointProps) => {
  const isLastStep = status === ShipmentStatus.CANCELLED || status === ShipmentStatus.DELIVERED

  return (
    <SRoutePointWrapper
      align="start"
      last={isLastStep}
      active={isStepCompleted || isStepInProgress}
    >
      <SRoutePointIcon align="center" justify="center" active={isStepCompleted || isStepInProgress}>
        {status === ShipmentStatus.CANCELLED ? (
          <IconCross size="xs" />
        ) : isStepCompleted ? (
          <IconTick size="xs" />
        ) : isStepInProgress ? (
          <IconClock size="xs" />
        ) : (
          <SDot active={isStepCompleted || isStepInProgress} />
        )}
      </SRoutePointIcon>
      <Box>
        <Copy
          scale={9}
          color={isStepCompleted || isStepInProgress ? "theme-b-n3" : "neutrals-5"}
          fontWeight={isStepCompleted || isStepInProgress ? "bold" : "regular"}
        >
          {status}
        </Copy>
        {date ? (
          <Copy scale={10} color="theme-n6-n5">
            {date}
          </Copy>
        ) : (
          <Spacer size={20} />
        )}
      </Box>
    </SRoutePointWrapper>
  )
}
