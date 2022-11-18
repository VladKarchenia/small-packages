import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Box, TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { DashboardList, DashboardTable } from "@/dashboard"
import { ShippingType } from "@/shipment"

const loading = false
const bookings = [
  { code: "12" },
  { code: "34" },
  { code: "56" },
  { code: "121" },
  { code: "341" },
  { code: "561" },
  { code: "122" },
  { code: "342" },
  { code: "562" },
  { code: "123" },
  { code: "343" },
  { code: "563" },
]

export const DashboardTabs = () => {
  const { t } = useTranslation()
  const isMedium = useMedia([mediaQueries.md], [true], false)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    setShowTable(isMedium)
  }, [isMedium])

  return (
    <Tabs selectedTab="shipments">
      <TabList label="dashboard-tabs" css={{ marginBottom: "$20" }}>
        <TabListItem id="shipments">Shipments</TabListItem>
        <TabListItem id="quotes">Quotes</TabListItem>
      </TabList>
      <TabPanels>
        <TabPanel id="shipments">
          <Box>
            {showTable ? (
              <DashboardTable
                isLoading={loading}
                bookings={bookings}
                shippingType={ShippingType.Shipment}
              />
            ) : (
              <DashboardList
                isLoading={loading}
                bookings={bookings}
                shippingType={ShippingType.Shipment}
              />
            )}
          </Box>
        </TabPanel>
        <TabPanel id="quotes">
          <Box>
            {showTable ? (
              <DashboardTable
                isLoading={loading}
                bookings={bookings}
                shippingType={ShippingType.Quote}
              />
            ) : (
              <DashboardList
                isLoading={loading}
                bookings={bookings}
                shippingType={ShippingType.Quote}
              />
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
