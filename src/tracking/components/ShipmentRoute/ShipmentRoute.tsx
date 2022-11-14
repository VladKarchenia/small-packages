import { Box, Copy, Flex } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"

interface RouteInfo {
  status: string
  date: string
}

interface IShipmentRouteProps {
  data: RouteInfo[]
}

export const ShipmentRoute = ({ data }: IShipmentRouteProps) => {
  return (
    <>
      <Flex
        align="start"
        css={{
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
              {data[0].status}
            </Copy>
            <Copy scale={9} color="neutrals-7" bold>
              {data[0].date}
            </Copy>
          </Box>
        </Flex>
      </Flex>
      <Flex>
        <Flex>
          <IconCalendar size="xs" css={{ paddingTop: "$4", paddingRight: "$12" }} />
          <Box>
            <Copy scale={8} color="system-black" bold>
              {data[1].status}
            </Copy>
            <Copy scale={9} color="neutrals-7" bold>
              {data[1].date}
            </Copy>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
