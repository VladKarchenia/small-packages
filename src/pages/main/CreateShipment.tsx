import { GridContainer, Spacer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { StepperContainer } from "@/shipment"

export const CreateShipment = () => {
  return (
    <CommonLayout>
      <GridContainer>
        <Spacer size={40} />
        <StepperContainer />
        <Spacer size={40} />
      </GridContainer>
    </CommonLayout>
  )
}
