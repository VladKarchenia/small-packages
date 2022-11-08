import { Box, Copy, Flex, } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"

type RouteInfo = {
  status: string,
  date: string,
}
type ShipmentRouteProps = {
  data: RouteInfo[],
}
export const ShipmentRoute = ({data}:ShipmentRouteProps) => {
  return(
    <>
      <Flex align="start" css={{paddingBottom: "$32", position: "relative",
        "&:before": {
          content: '',
          position: "absolute",
          top: "var(--space-14)",
          bottom: "var(--space-8)",
          margin: "auto",
          height: "calc(100% - 30px)",
          borderRight: "1px dashed black",
          left: "8px",
        }}}>
        <Flex css={{ paddingRight: "$8", paddingTop: "$4" }}>
          <IconCalendar size="xs" />
        </Flex>
        <Box>
          <Copy scale={8} color="system-black" bold>
            {data[0].status}
          </Copy>
          <Copy scale={9} color="neutrals-7" bold>
            {data[0].date}
          </Copy>
        </Box>
      </Flex>
      <Flex >
        <Flex align="start" css={{ paddingRight: "$8", paddingTop: "$4" }}>
          <IconCalendar size="xs" />
        </Flex>
        <Box>
          <Copy scale={8} color="system-black" bold>
            {data[1].status}
          </Copy>
          <Copy scale={9} color="neutrals-7" bold>
            {data[1].date}
          </Copy>
        </Box>
      </Flex>
  </>

  )
}
