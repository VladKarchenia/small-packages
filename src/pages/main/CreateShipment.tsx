import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { StepperContainer } from "@/shipment"

export const CreateShipment = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <StepperContainer />
      </MainLayout>
    </CommonLayout>
  )
}
