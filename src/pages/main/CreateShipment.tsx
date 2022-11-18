import { GridContainer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { ShippingType, StepperContainer } from "@/shipment"

export const CreateShipment = ({ shippingType }: { shippingType: ShippingType }) => {
  return (
    <CommonLayout>
      <GridContainer fullBleed>
        <StepperContainer shippingType={shippingType} />
      </GridContainer>
    </CommonLayout>
  )
}
