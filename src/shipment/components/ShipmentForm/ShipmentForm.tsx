import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"
import { Stepper } from "@/shared/components"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"
import {
  IStep,
  StepName,
  StepperFooter,
  StepItem,
  ShipmentDetails,
  ShipmentDetailsShort,
  DeliveryRates,
  DeliveryRatesShort,
  ShipmentStep,
  PersonInfoShort,
  PersonInfo,
  ShippingType,
} from "@/shipment"

type StepperState = {
  from: IStep
  to: IStep
  shipment: IStep
  rates: IStep
}

const initialState: StepperState = {
  from: {
    name: "from",
    completed: false,
    disabled: false,
    stepNumber: 1,
  },
  to: {
    name: "to",
    completed: false,
    disabled: true,
    stepNumber: 2,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
    stepNumber: 3,
  },
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 4,
  },
}

export const ShipmentForm = () => {
  const navigate = useNavigate()
  const [stepperState, setStepperState] = useState(initialState)
  const setShipmentContext = useShipmentActionContext()
  const { date, parcels, rate, recipient, sender } = useShipmentStateContext()

  const handleContinueClick = (step: ShipmentStep, nextStep: ShipmentStep) => {
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
      title: "Ship From",
      data: stepperState.from,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="sender" />,
      shortContent: <PersonInfoShort person="sender" />,
    },
    {
      title: "Ship To",
      data: stepperState.to,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="recipient" />,
      shortContent: <PersonInfoShort person="recipient" />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: (
        <ShipmentDetails
          handleContinueClick={handleContinueClick}
          shippingType={ShippingType.Shipment}
        />
      ),
      shortContent: <ShipmentDetailsShort shippingType={ShippingType.Shipment} />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates shippingType={ShippingType.Shipment} />,
      shortContent: <DeliveryRatesShort />,
    },
  ]

  const methods = useForm<ShipmentState>({
    mode: "onBlur",
    defaultValues: {
      sender: {
        ...sender,
        // TODO: remove it after BE connection with destination service
        fullAddress: { ...sender.fullAddress, location: "USA, New York" },
      },
      recipient: {
        ...recipient,
        // TODO: remove it after BE connection with destination service
        fullAddress: { ...recipient.fullAddress, location: "USA, Los Angeles" },
      },
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
    // TODO: fix this navifation later
    navigate("/")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper defaultSelected={[StepName.FROM]}>
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
          <StepperFooter shippingType={ShippingType.Shipment} />
        </Stepper>
      </form>
    </FormProvider>
  )
}
