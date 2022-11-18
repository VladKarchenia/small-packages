import { useNavigate } from "react-router-dom"
import { HeaderBar, useStepperContext } from "@/shared/components"
import { StepName, ShippingType } from "@/shipment"

const getPrevStep = ({
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
      case StepName.RATES:
        prevStep = StepName.SHIPMENT
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
      case StepName.RATES:
        prevStep = StepName.SHIPMENT
        break
    }
  }

  return prevStep
}

export const StepperHeader = ({
  shippingType,
  title,
}: {
  shippingType: ShippingType
  title: string
}) => {
  const navigate = useNavigate()
  const { selected, setSelected } = useStepperContext("StepperHeader")
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM

  const handleBackClick = () => {
    if (isFirstStep) {
      return navigate("/")
    }

    const prevStep = getPrevStep({ shippingType: shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return <HeaderBar title={title} onClick={handleBackClick} />
}
