import { useState } from "react"
import { useLocation } from "react-router-dom"

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
  ShipmentDateDetails,
  ShipmentDateDetailsShort,
} from "@/shipment"

type StepperState = {
  info: IStep
  shipment: IStep
  date: IStep
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
  date: {
    name: "date",
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

export const QuoteForm = () => {
  const [stepperState, setStepperState] = useState(initialState)
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

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
      title: "Ready Date",
      data: stepperState.date,
      mainContent: (
        <ShipmentDateDetails
          shippingType={ShippingType.Quote}
          handleContinueClick={handleContinueClick}
        />
      ),
      shortContent: <ShipmentDateDetailsShort />,
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
      title={isEditMode ? "Edit a quote" : "Create a quote"}
      defaultStep={StepName.INFO}
      stepsData={stepsData}
    />
  )
}
