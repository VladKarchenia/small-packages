import { Box, Copy, Flex, Link } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRoutePointProps {
  data: {
    status: string
    date: string
  },
  isLastStep: boolean
}

export const ShipmentRoutePoint = ({ data, isLastStep }: IShipmentRoutePointProps) => {
  console.log('ShipmentRoutePoint')
  console.log(data)
  return (
      <Flex
        align="start"
        css={ isLastStep ? {
          paddingBottom: "$32",
          position: "relative",
        } : {
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
        }}
      >
        <Flex>
          <IconCalendar size="xs" css={{ paddingTop: "$4", paddingRight: "$12" }} />
          <Box>
            <Copy scale={8} color="system-black" bold>
              {data.status}
            </Copy>
            <Copy scale={9} color="neutrals-7" bold>
              {data.date}
            </Copy>
          </Box>
        </Flex>
      </Flex>
  )
}
