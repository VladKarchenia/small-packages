import { useTranslation } from "react-i18next"
import {
  Box,
  Flex,
  Hidden,
  Redacted,
  Spacer,
  Table,
  TableBody,
  TableRow,
  TabularData,
} from "@/shared/components"
import { DashboardTableHead } from "./DashboardTableHead"

const PlaceholderRow = () => (
  <TableRow>
    <TabularData>
      <Flex align="center">
        <Hidden below="lg">
          <Flex>
            <Redacted height="$40" width="$40" animated css={{ borderRadius: "$rounded" }} />
            <Spacer horizontal size={16} />
          </Flex>
        </Hidden>
        <Box>
          <Flex>
            <Redacted height="$24" width="100px" text animated />
            <Spacer horizontal size={16} />
            <Redacted height="$24" width="64px" text animated />
          </Flex>
          <Flex css={{ marginTop: "$2" }}>
            <Redacted height="$24" width="64px" text animated />
            <Spacer size={24} horizontal />
            <Redacted height="$24" width="160px" text animated />
          </Flex>
        </Box>
      </Flex>
    </TabularData>
    <TabularData align="end">
      <Box css={{ display: "inline-block" }}>
        <Redacted height="$24" width="100px" text animated />
      </Box>
    </TabularData>
    <TabularData
      align="start"
      css={{
        width: 152,
        paddingLeft: "$48",
        "@lg": { width: 168, paddingLeft: "$64" },
      }}
    >
      <Box css={{ display: "inline-block" }}>
        <Redacted height="$24" width="92px" text animated />
      </Box>
    </TabularData>
    <TabularData
      align="start"
      css={{
        width: 152,
        paddingLeft: "$48",
        "@lg": { width: 168, paddingLeft: "$64" },
      }}
    >
      <Box css={{ display: "inline-block" }}>
        <Redacted height="$24" width="$64" text animated />
      </Box>
    </TabularData>
    <TabularData align="end">
      <Box css={{ display: "inline-block" }}>
        <Redacted height="$24" width="$24" text animated />
      </Box>
    </TabularData>
  </TableRow>
)

export const DashboardTablePlaceholder = () => {
  const { t } = useTranslation()

  return (
    <Table caption={t("dashboard:earnings.table.caption")}>
      <DashboardTableHead />
      <TableBody>
        {Array.from(new Array(20), (_, index) => index).map((v) => (
          <PlaceholderRow key={`placeholder-row-${v}`} />
        ))}
      </TableBody>
    </Table>
  )
}
