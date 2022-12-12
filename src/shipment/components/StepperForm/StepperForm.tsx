import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { scrollTo } from "@/utils"
import { Stepper } from "@/shared/components"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"
import {
  StepName,
  StepperFooter,
  StepItem,
  ShippingType,
  StepperHeader,
  IStepsDataItem,
} from "@/shipment"

interface IStepperFormProps {
  shippingType: ShippingType
  title: string
  defaultStep: StepName
  stepsData: IStepsDataItem[]
}

export const StepperForm = ({ shippingType, title, defaultStep, stepsData }: IStepperFormProps) => {
  const navigate = useNavigate()
  const setShipmentContext = useShipmentActionContext()
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()

  const methods = useForm<ShipmentState>({
    mode: "onChange",
    defaultValues: {
      sender: sender,
      recipient: recipient,
      parcels: parcels,
      date: date,
      rate: rate,
    },
  })

  const onSubmit = (data: ShipmentState) => {
    setShipmentContext({
      sender: data.sender,
      recipient: data.recipient,
      parcels: data.parcels,
      date: data.date,
      rate: data.rate,
    })

    shippingType === ShippingType.Quote ? navigate("/create/shipment") : navigate("/tracking")
  }

  useEffect(() => {
    // TODO: fix this initial position on create shipment page
    scrollTo({ position: { top: 0, left: 0 } })
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper defaultSelected={[defaultStep]}>
          <StepperHeader shippingType={shippingType} title={title} />

          {stepsData.map((step) => (
            <StepItem
              key={step.title}
              title={step.title}
              data={step.data}
              mainContent={step.mainContent}
              shortContent={step.shortContent}
              totalSteps={stepsData.length}
            />
          ))}

          <StepperFooter shippingType={shippingType} />
        </Stepper>
      </form>
    </FormProvider>
  )
}
