import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button, CreateButton, GridContainer, MobileHeader, Spacer } from "@/shared/components"
import { useModalActions } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"
import { DashboardTabs } from "@/dashboard"

export const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { open } = useModalActions()

  return (
    <CommonLayout>
      <GridContainer>
        <MobileHeader />
        <DashboardTabs />
        <Spacer size={40} />
        <Button onClick={() => navigate("/tracking")}>Tracking page</Button>
        <Spacer size={40} />
        <CreateButton
          size="lg"
          color="black"
          iconSize="lg"
          ariaLabel="Create button"
          buttonCss={{ zIndex: "$9", position: "fixed", bottom: "$20", right: "$16" }}
          onClick={() => open("createShipment")}
        />
      </GridContainer>
    </CommonLayout>
  )
}
