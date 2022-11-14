import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Box,
  BurgerMenu,
  Button,
  GridContainer,
  Spacer,
  TabList,
  TabListItem,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/shared/components"
import { useMedia, useModalActions } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"
import { mediaQueries } from "@/config"
import { DashboardList, DashboardTable } from "@/dashboard"

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

export const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { open } = useModalActions()
  const isMedium = useMedia([mediaQueries.md], [true], false)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    setShowTable(isMedium)
  }, [isMedium])

  return (
    <CommonLayout>
      <GridContainer>
        <BurgerMenu />
      </GridContainer>
      <GridContainer>
        <Box css={{ paddingTop: "$24" }}>
          {showTable ? (
            <DashboardTable isLoading={loading} bookings={bookings} />
          ) : (
            <DashboardList isLoading={loading} bookings={bookings} />
          )}
        </Box>
        <Spacer size={40} />
        <Button onClick={() => navigate("/create/quote")}>Create Quote</Button>
        <Spacer size={40} />
        <Button onClick={() => navigate("/create/shipment")}>Create Shipment</Button>
        <Spacer size={40} />
        <Button onClick={() => open("timePeriod")}>Open modal</Button>
        <Spacer size={40} />
        <Button onClick={() => navigate("/tracking")}>Tracking page</Button>
        <Spacer size={40} />
        <Tabs selectedTab="tab1">
          <TabList label="" css={{ marginBottom: "$24" }}>
            <TabListItem id="tab1">Tab 1</TabListItem>
            <TabListItem id="tab2">Tab 2</TabListItem>
          </TabList>
          <TabPanels>
            <TabPanel id="tab1">Tab 1 content</TabPanel>
            <TabPanel id="tab2">Tab 2 content</TabPanel>
          </TabPanels>
        </Tabs>
        <Spacer size={40} />
      </GridContainer>
    </CommonLayout>
  )
}
