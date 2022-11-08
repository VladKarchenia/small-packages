import { useState } from "react"
import { Stepper } from "@/shared/components"
import { IStep, ShipmentStepEnum, StepperFooter } from "@/shipment"
import { DeliveryRates, DeliveryRatesShort } from "../DeliveryRates"
import { AddressInfo, AddressInfoShort } from "../AddressInfo"
import { ShipmentDetails, ShipmentDetailsShort } from "../ShipmentDetails"
import { StepItem } from "../StepItem"
import { FormProvider, useForm } from "react-hook-form"
import {
  IAddress,
  IParcel,
  IRate,
  useShipmentActionContext,
  useShipmentStateContext,
} from "@/shared/state"
import { useNavigate } from "react-router-dom"

type State = {
  info: IStep
  shipment: IStep
  rates: IStep
}

export interface IStepperFormValues {
  fromAddress: IAddress
  toAddress: IAddress
  parcels: IParcel[]
  date: Date | null
  rate: IRate
}

const initialState: State = {
  info: {
    name: "info",
    completed: false,
    disabled: false,
    stepNumber: 1,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
    stepNumber: 2,
  },
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 3,
  },
}

export const StepperContainer = () => {
  const navigate = useNavigate()
  const [stepperState, setStepperState] = useState(initialState)
  const setShipmentContext = useShipmentActionContext()
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()

  const handleContinueClick = (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => {
    setStepperState((prevState) => {
      return {
        ...prevState,
        [step]: {
          ...prevState[step],
          name: step,
          completed: true,
          disabled: false,
        },
        [nextStep]: {
          ...prevState[nextStep],
          name: nextStep,
          completed: false,
          disabled: false,
        },
      }
    })
  }

  const stepsData = [
    {
      title: "Address Information",
      data: stepperState.info,
      mainContent: <AddressInfo handleContinueClick={handleContinueClick} />,
      shortContent: <AddressInfoShort />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: <ShipmentDetails handleContinueClick={handleContinueClick} />,
      shortContent: <ShipmentDetailsShort />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates />,
      shortContent: <DeliveryRatesShort />,
    },
  ]

  const methods = useForm<IStepperFormValues>({
    mode: "onBlur",
    defaultValues: {
      fromAddress: {
        ...sender.fullAddress,
        // TODO: remove it after BE connection with destination service
        location: "USA, New York",
      },
      toAddress: {
        ...recipient.fullAddress,
        // TODO: remove it after BE connection with destination service
        location: "USA, Los Angeles",
      },
      parcels: parcels,
      date: date,
      rate: rate,
    },
  })

  const onSubmit = (data: IStepperFormValues) => {
    setShipmentContext({
      sender: {
        ...sender,
        fullAddress: data.fromAddress,
      },
      recipient: {
        ...recipient,
        fullAddress: data.toAddress,
      },
      parcels: data.parcels,
      date: data.date,
      rate: data.rate,
    })
    // TODO: navigate to the create shipment page
    navigate("/")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper defaultSelected={[ShipmentStepEnum.INFO]}>
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
          <StepperFooter />
        </Stepper>
      </form>
    </FormProvider>
  )
}
