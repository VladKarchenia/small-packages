import { useTranslation } from "react-i18next"
import { Box, TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/config"
import { DashboardList, DashboardTable } from "@/dashboard"
import { ShippingType } from "@/shipment"

const loading = false
const bookings = [
  {
    id: "#10214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#20214-7Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#30214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#40214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#50214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#60214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#70214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#80214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#90214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#21214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#22214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#23214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#24214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#25214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#26214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#27214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#28214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#29214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#20214-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
  {
    id: "#20114-8Z",
    sender: {
      name: "Vlad Karch",
      fullAddress: { location: "USA, New York, 601 AMSTERDAM AVE STATEN ISLAND 44" },
    },
    recipient: {
      name: "Natali Zakh",
      fullAddress: { location: "USA, Los Angeles, 101 AMSTERDAM AVE STATEN ISLAND 34" },
    },
    creationDate: "Oct 9, 2022",
    status: "Confirmed",
  },
]

export const DashboardTabs = () => {
  const { t } = useTranslation()
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)

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
            {isMediumAndAbove ? (
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
