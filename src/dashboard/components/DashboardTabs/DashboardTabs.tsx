import { useTranslation } from "react-i18next"

import { mediaQueries } from "@/config"
import { useMedia } from "@/shared/hooks"
import { useDashboardActionContext } from "@/dashboard/state"
import { ShippingType } from "@/shipment"

import { Box, TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import { DashboardList, DashboardTable } from "@/dashboard"

export const DashboardTabs = () => {
  const { t } = useTranslation()
  const { setDashboardShippingType, resetFilterField } = useDashboardActionContext()

  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  // TODO: put active tab value in Zustand store

  return (
    <Tabs
      selectedTab="shipments"
      animate={false}
      css={{ paddingBottom: "$40", "@sm": { paddingBottom: "$0" } }}
    >
      <TabList label="dashboard-tabs">
        <TabListItem
          id="shipments"
          onChange={() => {
            setDashboardShippingType(ShippingType.Shipment)
            resetFilterField("status")
            resetFilterField("recipientName")
            resetFilterField("originalAddress")
            resetFilterField("destinationAddress")
          }}
        >
          Shipments
        </TabListItem>
        <TabListItem
          id="quotes"
          onChange={() => {
            setDashboardShippingType(ShippingType.Quote)
            resetFilterField("status")
            resetFilterField("recipientName")
            resetFilterField("originalAddress")
            resetFilterField("destinationAddress")
          }}
        >
          Quotes
        </TabListItem>
      </TabList>
      <TabPanels>
        <TabPanel id="shipments">
          <Box>{isMediumAndAbove ? <DashboardTable /> : <DashboardList />}</Box>
        </TabPanel>
        <TabPanel id="quotes">
          <Box>{isMediumAndAbove ? <DashboardTable /> : <DashboardList />}</Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
