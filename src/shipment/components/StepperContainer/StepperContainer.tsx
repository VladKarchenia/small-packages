import { Accordion } from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"
import { useShipmentContext } from "@/shared/state"
import { AddressInfo } from "../AddressInfo"
import { Confirmation } from "../Confirmation"
import { ShipmentDetails } from "../ShipmentDetails"
import { Summary } from "../Summary"
import { StepperItem } from "../StepperItem"

export const StepperContainer = () => {
  const shipmentContext = useShipmentContext()

  const stepsData = [
    {
      title: "1. Address Information",
      data: shipmentContext?.state.info,
      content: <AddressInfo />,
    },
    {
      title: "2. Shipment Details",
      data: shipmentContext?.state.shipment,
      content: <ShipmentDetails />,
    },
    {
      title: "3. Summary",
      data: shipmentContext?.state.summary,
      content: <Summary />,
    },
    {
      title: "4. Confirmation",
      data: shipmentContext?.state.confirmation,
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
