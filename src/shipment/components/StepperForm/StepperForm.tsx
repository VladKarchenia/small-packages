import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation } from "react-query"

import { createShipmentFn, updateShipmentFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { scrollTo } from "@/utils"
import { formatShipmentRequestData } from "@/shared/utils"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"

import { Stepper } from "@/shared/components"
import {
  StepName,
  StepperFooter,
  StepItem,
  StepperHeader,
  IStepsDataItem,
  ShippingType,
} from "@/shipment"
import { TrackingRouteParams } from "@/tracking/types"
import { ShipmentStatus } from "@/shared/types"

interface IStepperFormProps {
  title: string
  defaultStep: StepName
  stepsData: IStepsDataItem[]
}

export const StepperForm = ({ title, defaultStep, stepsData }: IStepperFormProps) => {
  const { shipmentId } = useParams<keyof TrackingRouteParams>() as TrackingRouteParams
  const navigate = useNavigate()
  const { setShipmentData, setShippingType } = useShipmentActionContext()
  const { date, parcels, rate, recipient, sender, senderReturn, hasReturnAddress, shippingType } =
    useShipmentStateContext()
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const methods = useForm<ShipmentState>({
    mode: "onChange",
    defaultValues: {
      sender: sender,
      senderReturn: senderReturn,
      recipient: recipient,
      parcels: parcels,
      date: date,
      rate: rate,
      hasReturnAddress: hasReturnAddress,
    },
  })

  const { mutate: createShipment, isLoading } = useMutation(
    (data: ShipmentState) => createShipmentFn(formatShipmentRequestData(data, shippingType)),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        // navigate(`/edit/shipment/${id}`)

        if (shippingType === ShippingType.Quote) {
          setShippingType(ShippingType.Shipment)
          navigate(`/edit/shipment/${id}`)
        } else {
          navigate(`/tracking/${id}`)
        }
      },
    },
  )

  const { mutate: updateShipment } = useMutation(
    (data: ShipmentState) =>
      updateShipmentFn(
        shipmentId,
        formatShipmentRequestData(
          data,
          shippingType,
          shippingType === ShippingType.Quote ? ShipmentStatus.DRAFT : ShipmentStatus.CONFIRMED,
        ),
      ),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        if (shippingType === ShippingType.Quote) {
          setShippingType(ShippingType.Shipment)
          navigate(`/edit/shipment/${id}`)
        } else {
          navigate(`/tracking/${id}`)
        }
      },
    },
  )

  const onSubmitHandler = (data: ShipmentState) => {
    setShipmentData({
      sender: data.sender,
      senderReturn: data.senderReturn,
      recipient: data.recipient,
      parcels: data.parcels,
      date: data.date,
      rate: data.rate,
      shippingType: data.shippingType,
      shipmentStatus: data.shipmentStatus,
      currentLocation: {
        displayName: "",
        latitude: "",
        longitude: "",
      },
      hasReturnAddress: data.hasReturnAddress,
    } as ShipmentState)
    isEditMode ? updateShipment(data) : createShipment(data)
  }

  useEffect(() => {
    // TODO: fix this initial position on create shipment page
    scrollTo({ position: { top: 0, left: 0 } })
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <Stepper defaultSelected={[defaultStep]}>
          <StepperHeader title={title} />

          {stepsData.map((step) => (
            <StepItem
              key={step.title}
              title={step.title}
              data={step.data}
              mainContent={step.mainContent}
              totalSteps={stepsData.length}
            />
          ))}

          <StepperFooter />
        </Stepper>
      </form>
    </FormProvider>
  )
}
