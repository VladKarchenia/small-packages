import { GridContainer, Spacer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { ShipmentContextProvider } from "@/shared/state"
import { StepperContainer } from "@/shipment"

export const CreateShipment = () => {
  return (
    <ShipmentContextProvider>
      <CommonLayout>
        <GridContainer>
          <Spacer size={40} />
          <StepperContainer />
          <Spacer size={40} />
        </GridContainer>
      </CommonLayout>
    </ShipmentContextProvider>
  )
}
