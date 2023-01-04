import { useTranslation } from "react-i18next"
import { Box, TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { DashboardList, DashboardTable } from "@/dashboard"
import { ShippingType } from "@/shipment"

export const DashboardTabs = () => {
  const { t } = useTranslation()
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  // TODO: put active tab value in Zustand store

  return (
    <Tabs
      selectedTab="shipments"
      animate={false}
      css={{ paddingBottom: "$40", "@sm": { paddingBottom: "$0" } }}
    >
      <TabList label="dashboard-tabs">
        <TabListItem id="shipments">Shipments</TabListItem>
        <TabListItem id="quotes">Quotes</TabListItem>
      </TabList>
      <TabPanels>
        <TabPanel id="shipments">
          <Box>
            {isMediumAndAbove ? (
              <DashboardTable shippingType={ShippingType.Shipment} />
            ) : (
              <DashboardList shippingType={ShippingType.Shipment} />
            )}
          </Box>
        </TabPanel>
        <TabPanel id="quotes">
          <Box>
            {isMediumAndAbove ? (
              <DashboardTable shippingType={ShippingType.Quote} />
            ) : (
              <DashboardList shippingType={ShippingType.Quote} />
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
