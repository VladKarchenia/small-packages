import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Box,
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
import { IconTick } from "@/shared/icons"
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
  const { open } = useModalActions()
  const isMedium = useMedia([mediaQueries.md], [true], false)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    setShowTable(isMedium)
  }, [isMedium])

  return (
    <CommonLayout>
      <GridContainer>
        <Box>{t("common:test.title")}</Box>
        <Box>{t("common:test.copy")}</Box>
        <IconTick />
        <Spacer size={40} />
        <Button onClick={() => open("timePeriod")}>Open modal</Button>
        <Spacer size={40} />
        <Tabs selectedTab="listings">
          <TabList label="" css={{ marginBottom: "$24" }}>
            <TabListItem id="listings">Listings</TabListItem>
            <TabListItem id="payout-methods">Payout Methods</TabListItem>
          </TabList>
          <TabPanels>
            <TabPanel id="listings">1. Content from listings tab</TabPanel>
            <TabPanel id="payout-methods">2. Content from payout-methods tab</TabPanel>
          </TabPanels>
        </Tabs>
        <Spacer size={40} />
        {showTable ? (
          <DashboardTable isLoading={loading} bookings={bookings} />
        ) : (
          <DashboardList isLoading={loading} bookings={bookings} />
        )}
      </GridContainer>
    </CommonLayout>
  )
}
