import { ShippingType } from "@/shared/types"
import { StepName } from "@/shipment/types"

export const getPrevStep = ({
  shippingType,
  currentStep,
}: {
  shippingType: ShippingType
  currentStep: string
}) => {
  let prevStep = currentStep

  if (shippingType === ShippingType.Quote) {
    switch (currentStep) {
      case StepName.SHIPMENT:
        prevStep = StepName.INFO
        break
      case StepName.DATE:
        prevStep = StepName.SHIPMENT
        break
      case StepName.RATES:
        prevStep = StepName.DATE
        break
    }
  } else {
    switch (currentStep) {
      case StepName.TO:
        prevStep = StepName.FROM
        break
      case StepName.SHIPMENT:
        prevStep = StepName.TO
        break
      case StepName.DATE:
        prevStep = StepName.SHIPMENT
        break
      case StepName.RATES:
        prevStep = StepName.DATE
        break
      case StepName.SUMMARY:
        prevStep = StepName.RATES
        break
      case StepName.RECEIPT:
        prevStep = StepName.SUMMARY
        break
    }
  }

  return prevStep
}
