import { useEffect } from "react"
import { shallow } from "zustand/shallow"

import { mediaQueries } from "@/stitches/theme"
import { useMedia } from "@/shared/hooks"
import { useBoundStore } from "@/store"
import { ShipmentsPagedOrderBy, SortDirection, useDashboardActionContext } from "@/dashboard/state"
import { ShippingType } from "@/shared/types"

import { Box, TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import { DashboardList, DashboardTable } from "@/dashboard/components"

export const DashboardTabs = () => {
  const { resetFilterField, setSortOrder, setSortDirection } = useDashboardActionContext()
  const [tab, setShippingType, setTab] = useBoundStore(
    (state) => [state.tab, state.setShippingType, state.setTab],
    shallow,
  )

  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)

  useEffect(() => {
    setShippingType(tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tabs selectedTab={tab} animate={false}>
      <TabList label="dashboard-tabs">
        <TabListItem
          id={ShippingType.Shipment}
          onChange={() => {
            setTab(ShippingType.Shipment)
            setShippingType(ShippingType.Shipment)
            resetFilterField("status")
            resetFilterField("recipientName")
            resetFilterField("originalAddress")
            resetFilterField("destinationAddress")
            setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
            setSortDirection(SortDirection.ASC)
          }}
        >
          Shipments
        </TabListItem>
        <TabListItem
          id={ShippingType.Quote}
          onChange={() => {
            setTab(ShippingType.Quote)
            setShippingType(ShippingType.Quote)
            resetFilterField("status")
            resetFilterField("recipientName")
            resetFilterField("originalAddress")
            resetFilterField("destinationAddress")
            setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
            setSortDirection(SortDirection.ASC)
          }}
        >
          Quotes
        </TabListItem>
      </TabList>
      <TabPanels>
        <TabPanel id={ShippingType.Shipment}>
          <Box>{isMediumAndAbove ? <DashboardTable /> : <DashboardList />}</Box>
        </TabPanel>
        <TabPanel id={ShippingType.Quote}>
          <Box>{isMediumAndAbove ? <DashboardTable /> : <DashboardList />}</Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
