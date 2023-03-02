import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { StepperContainer } from "@/shipment/components"

export const Shipment = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <StepperContainer />
      </MainLayout>
    </CommonLayout>
  )
}
