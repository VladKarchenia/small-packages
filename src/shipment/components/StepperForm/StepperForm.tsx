import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { scrollTo } from "@/utils"
import { createShipmentFn } from "@/api/shipmentApi"
import { formatShipmentRequestData } from "@/shared/utils"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"
import { Stepper } from "@/shared/components"
import {
  StepName,
  StepperFooter,
  StepItem,
  ShippingType,
  StepperHeader,
  IStepsDataItem,
} from "@/shipment"
import { IShipmentResponse } from "@/api/types"

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

  const { mutate: createShipment, isLoading } = useMutation(
    (data: ShipmentState) => createShipmentFn(formatShipmentRequestData(data, shippingType)),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        shippingType === ShippingType.Quote
          ? navigate(`/edit/shipment/${id}`)
          : navigate(`/tracking/${id}`)
      },
      // onError: (error: any) => {
      //   if (Array.isArray((error as any).response.data.error)) {
      //     ;(error as any).response.data.error.forEach((el: any) =>
      //       toast.error(el.message, {
      //         position: "top-right",
      //       }),
      //     )
      //   } else {
      //     toast.error((error as any).response.data.message, {
      //       position: "top-right",
      //     })
      //   }
      // },
    },
  )

  const onSubmitHandler = (data: ShipmentState) => {
    setShipmentContext({
      sender: data.sender,
      recipient: data.recipient,
      parcels: data.parcels,
      date: data.date,
      rate: data.rate,
      shippingType: shippingType,
      shipmentStatus: null,
      currentLocation: {
        displayName: "",
        latitude: "",
        longitude: "",
      },
    })
    createShipment(data)
  }

  useEffect(() => {
    // TODO: fix this initial position on create shipment page
    scrollTo({ position: { top: 0, left: 0 } })
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
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
