import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ShippingType, StepperContainer } from "@/shipment"
import { Breadcrumbs } from "@/shared/components"

export const CreateShipment = ({ shippingType }: { shippingType: ShippingType }) => {
  return (
    <CommonLayout>
      <MainLayout fullContentSize={false}>
        <Breadcrumbs />
        <StepperContainer shippingType={shippingType} />
      </MainLayout>
    </CommonLayout>
  )
}
