import { useState } from "react"
import { Accordion } from "@/shared/components"
import { IStep, ShipmentStepEnum } from "@/shipment"
import { AddressInfo } from "../AddressInfo"
import { Confirmation } from "../Confirmation"
import { ShipmentDetails } from "../ShipmentDetails"
import { Summary } from "../Summary"
import { StepperItem } from "../StepperItem"

type State = {
  info: IStep
  shipment: IStep
  summary: IStep
  confirmation: IStep
}

const initialState: State = {
  info: {
    name: "info",
    completed: false,
    disabled: false,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
  },
  summary: {
    name: "summary",
    completed: false,
    disabled: true,
  },
  confirmation: {
    name: "confirmation",
    completed: false,
    disabled: true,
  },
}

export const StepperContainer = () => {
  const [stepperState, setStepperState] = useState(initialState)

  const handleContinueClick = (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => {
    setStepperState((prevState) => ({
      ...prevState,
      [step]: {
        name: step,
        completed: true,
        disabled: false,
      },
      [nextStep]: {
        name: nextStep,
        completed: false,
        disabled: false,
      },
    }))
  }

  const stepsData = [
    {
      title: "1. Address Information",
      data: stepperState.info,
      content: <AddressInfo handleContinueClick={handleContinueClick} />,
    },
    {
      title: "2. Shipment Details",
      data: stepperState.shipment,
      content: <ShipmentDetails handleContinueClick={handleContinueClick} />,
    },
    {
      title: "3. Summary",
      data: stepperState.summary,
      content: <Summary handleContinueClick={handleContinueClick} />,
    },
    {
      title: "4. Confirmation",
      data: stepperState.confirmation,
      content: <Confirmation />,
    },
  ]

  // const readStorage = () =>
  //   window.sessionStorage.getItem("selectedStep") || ""

  // const [previouslySelectedPanel, setPreviouslySelectedPanel] = useStorageState(
  //   "sessionStorage",
  //   "selectedStep",
  //   readStorage(),
  // )

  return (
    <Accordion
      // defaultSelected={[previouslySelectedPanel]}
      defaultSelected={[ShipmentStepEnum.INFO]}
      css={{ borderTop: 0 }}
    >
      {stepsData.map((step) => (
        <StepperItem key={step.title} title={step.title} data={step.data} content={step.content} />
      ))}
    </Accordion>
  )
}
