import { QuoteForm, ShipmentForm, ShippingType } from "@/shipment"

export const StepperContainer = ({ shippingType }: { shippingType: ShippingType }) => {
  return shippingType === ShippingType.Quote ? <QuoteForm /> : <ShipmentForm />
}
