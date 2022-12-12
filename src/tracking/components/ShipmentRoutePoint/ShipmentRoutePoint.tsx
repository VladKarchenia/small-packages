import { Box, Copy, Spacer } from "@/shared/components"
import { IconTick, IconClock, IconCross } from "@/shared/icons"
import { ShipmentStatus } from "@/shared/types"
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
  const isLastStep = status === ShipmentStatus.Eliminated || status === ShipmentStatus.Delivered

  return (
    <SRoutePointWrapper align="start" last={isLastStep}>
      <SRoutePointIcon align="center" justify="center" active={isStepCompleted || isStepInProgress}>
        {status === ShipmentStatus.Eliminated ? (
          <IconCross size="xs" />
        ) : isStepCompleted ? (
          <IconTick size="xs" />
        ) : isStepInProgress ? (
          <IconClock size="xs" />
        ) : (
          <SDot />
        )}
      </SRoutePointIcon>
      <Box>
        <Copy
          scale={8} //TODO: check fonts { "@initial": 8, "@sm": 8 }
          color={isStepCompleted || isStepInProgress ? "system-black" : "neutrals-5"}
        >
          {status}
        </Copy>
        {date ? (
          <Copy
            scale={9} //TODO: check fonts { "@initial": 9, "@sm": 9 }
            color="neutrals-5"
          >
            {date}
          </Copy>
        ) : (
          <Spacer size={20} />
        )}
      </Box>
    </SRoutePointWrapper>
  )
}
