import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import {
  IStep,
  StepName,
  ShipmentDetails,
  DeliveryRates,
  ShipmentStep,
  PersonInfo,
  StepperForm,
  IStepsDataItem,
  ShipmentDateDetails,
  Summary,
  Receipt,
} from "@/shipment"

type StepperState = {
  from: IStep
  to: IStep
  shipment: IStep
  date: IStep
  rates: IStep
  summary: IStep
  receipt: IStep
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
  summary: {
    name: "summary",
    completed: false,
    disabled: true,
    stepNumber: 6,
  },
  receipt: {
    name: "receipt",
    completed: false,
    disabled: true,
    stepNumber: 7,
  },
}

export const ShipmentForm = () => {
  const [stepperState, setStepperState] = useState(initialState)
  const [defaultStep, setDefaultStep] = useState<StepName | null>(null)
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

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
      mainContent: (
        <PersonInfo
          handleContinueClick={handleContinueClick}
          person="sender"
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <PersonInfoCollapsed person="sender" />,
    },
    {
      title: "Ship To",
      data: stepperState.to,
      mainContent: (
        <PersonInfo
          handleContinueClick={handleContinueClick}
          person="recipient"
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <PersonInfoCollapsed person="recipient" />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: (
        <ShipmentDetails
          handleContinueClick={handleContinueClick}
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <ShipmentDetailsShort />,
    },
    {
      title: "Ready Date",
      data: stepperState.date,
      mainContent: (
        <ShipmentDateDetails
          handleContinueClick={handleContinueClick}
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <ShipmentDateDetailsShort />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates handleContinueClick={handleContinueClick} />,
      // shortContent: <DeliveryRatesShort />,
    },
    {
      title: "Summary",
      data: stepperState.summary,
      mainContent: <Summary handleContinueClick={handleContinueClick} />,
    },
    {
      title: "Receipt",
      data: stepperState.receipt,
      mainContent: <Receipt />,
    },
  ]

  useEffect(() => {
    // set active step
    setDefaultStep(StepName.FROM)
    // check expired date and time ->
    // set stepper state
    if (isEditMode) {
      setStepperState((prevState) => {
        return {
          ...prevState,
          from: {
            ...prevState.from,
            completed: true,
            disabled: false,
          },
          to: {
            ...prevState.to,
            completed: true,
            disabled: false,
          },
          shipment: {
            ...prevState.shipment,
            completed: true,
            disabled: false,
          },
          date: {
            ...prevState.date,
            completed: true,
            disabled: false,
          },
          rates: {
            ...prevState.rates,
            completed: true,
            disabled: false,
          },
          summary: {
            ...prevState.summary,
            completed: true,
            disabled: false,
          },
          // TODO: depends on if it was created in Proship
          receipt: {
            ...prevState.receipt,
            completed: false,
            disabled: true,
          },
        }
      })
    }
  }, [])

  if (!defaultStep) return null

  return (
    <StepperForm
      title={isEditMode ? "Edit a shipment" : "Create a shipment"}
      defaultStep={defaultStep}
      stepsData={stepsData}
    />
  )
}
