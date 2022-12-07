import { useState } from "react"
import {
  IStep,
  StepName,
  ShipmentDetails,
  ShipmentDetailsShort,
  DeliveryRates,
  DeliveryRatesShort,
  ShipmentStep,
  PersonInfoCollapsed,
  PersonInfo,
  ShippingType,
  StepperForm,
  IStepsDataItem,
  ShipmentDateDetails,
  ShipmentDateDetailsShort,
} from "@/shipment"

type StepperState = {
  from: IStep
  to: IStep
  shipment: IStep
  date: IStep
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
  date: {
    name: "date",
    completed: false,
    disabled: true,
    stepNumber: 4,
  },
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 5,
  },
}

export const ShipmentForm = () => {
  const [stepperState, setStepperState] = useState(initialState)

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

  const stepsData: IStepsDataItem[] = [
    {
      title: "Ship From",
      data: stepperState.from,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="sender" />,
      shortContent: <PersonInfoCollapsed person="sender" />,
    },
    {
      title: "Ship To",
      data: stepperState.to,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="recipient" />,
      shortContent: <PersonInfoCollapsed person="recipient" />,
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
      title: "Ready Date",
      data: stepperState.date,
      mainContent: (
        <ShipmentDateDetails
          shippingType={ShippingType.Shipment}
          handleContinueClick={handleContinueClick}
        />
      ),
      shortContent: <ShipmentDateDetailsShort />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates shippingType={ShippingType.Shipment} />,
      shortContent: <DeliveryRatesShort />,
    },
  ]

  return (
    <StepperForm
      shippingType={ShippingType.Shipment}
      title="Create a shipment"
      defaultStep={StepName.FROM}
      stepsData={stepsData}
    />
  )
}
