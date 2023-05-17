import { useTranslation } from "react-i18next"
import { CreateButton, GridContainer, MobileHeader, Spacer } from "@/shared/components"
import { useModalActions } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"
import { DashboardTabs } from "@/dashboard"
import { DashboardProvider } from "@/dashboard/state"

export const Home = () => {
  const { t } = useTranslation()
  const { open } = useModalActions()

  return (
    <DashboardProvider>
      <CommonLayout>
        <GridContainer>
          <MobileHeader />
          <DashboardTabs />
          <Spacer size={40} />
          <CreateButton
            size="lg"
            color="black"
            iconSize="lg"
            ariaLabel="Create button"
            buttonCss={{ zIndex: "$9", position: "fixed", bottom: "$56", right: "$16" }}
            onClick={() => open("createShipment")}
            dataTestid="create-button"
          />
        </GridContainer>
      </CommonLayout>
    </DashboardProvider>
  )
}
