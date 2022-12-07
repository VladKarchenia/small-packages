import { Hidden, MobileHeader } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { DashboardProvider } from "@/dashboard/state"
import { DashboardTabs } from "@/dashboard"

export const Home = () => {
  return (
    <DashboardProvider>
      <CommonLayout>
        <MainLayout withGlobalSearch mobileFullBleed={false}>
          <Hidden above="sm">
            <MobileHeader />
          </Hidden>
          <DashboardTabs />
        </MainLayout>
      </CommonLayout>
    </DashboardProvider>
  )
}
