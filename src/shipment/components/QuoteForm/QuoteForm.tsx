import { useState } from "react"
import {
  IStep,
  StepName,
  ShipmentDetails,
  ShipmentDetailsShort,
  AddressInfo,
  AddressInfoCollapsed,
  DeliveryRates,
  DeliveryRatesShort,
  QuoteStep,
  ShippingType,
  StepperForm,
} from "@/shipment"

type StepperState = {
  info: IStep
  shipment: IStep
  rates: IStep
}

const initialState: StepperState = {
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

export const QuoteForm = () => {
  const [stepperState, setStepperState] = useState(initialState)

  const handleContinueClick = (step: QuoteStep, nextStep: QuoteStep) => {
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
      shortContent: <AddressInfoCollapsed />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: (
        <ShipmentDetails
          handleContinueClick={handleContinueClick}
          shippingType={ShippingType.Quote}
        />
      ),
      shortContent: <ShipmentDetailsShort shippingType={ShippingType.Quote} />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates shippingType={ShippingType.Quote} />,
      shortContent: <DeliveryRatesShort />,
    },
  ]

  return (
    <StepperForm
      shippingType={ShippingType.Quote}
      title="Create a quote"
      defaultStep={StepName.INFO}
      stepsData={stepsData}
    />
  )
}
