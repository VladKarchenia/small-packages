import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ShippingType, StepperContainer } from "@/shipment"

export const CreateShipment = ({ shippingType }: { shippingType: ShippingType }) => {
  return (
    <CommonLayout>
      <MainLayout fullContentSize={false}>
        <StepperContainer shippingType={shippingType} />
      </MainLayout>
    </CommonLayout>
  )
}
