import { useNavigate } from "react-router-dom"
import { HeaderBar, useStepperContext } from "@/shared/components"
import { StepName, ShippingType, getPrevStep } from "@/shipment"

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

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate("/")
    }

    const prevStep = getPrevStep({ shippingType: shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return <HeaderBar title={title} onClick={onBackHandler} />
}
