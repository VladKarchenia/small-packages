import { GridContainer, Spacer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { ShippingType, StepperContainer } from "@/shipment"

export const CreateShipment = ({ shippingType }: { shippingType: ShippingType }) => {
  return (
    <CommonLayout>
      <GridContainer fullBleed>
        <Spacer size={40} />
        <StepperContainer shippingType={shippingType} />
        <Spacer size={40} />
      </GridContainer>
    </CommonLayout>
  )
}
