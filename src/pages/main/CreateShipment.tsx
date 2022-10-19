import {
  Accordion,
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  GridContainer,
  Spacer,
  useAccordionContext,
} from "@/shared/components"
import { useStorageState } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"
import { IStep, useShipmentContext } from "@/shared/state"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const CreateShipment = () => {
  return (
    <CommonLayout>
      <GridContainer>
        <Spacer size={40} />
        <Box>Create Shipment</Box>
        <Spacer size={40} />
        <AccordionWrapper />
      </GridContainer>
    </CommonLayout>
  )
}

const AccordionWrapper = () => {
  const shipmentContext = useShipmentContext()

  const readStorage = () =>
    window.sessionStorage.getItem("selectedStep") || shipmentContext?.state.activeStep || ""

  const [previouslySelectedPanel, setPreviouslySelectedPanel] = useStorageState(
    "sessionStorage",
    "selectedStep",
    readStorage(),
  )

  const handleSelectedChange = useCallback(
    (selected: string[]) => {
      if (selected.length) {
        setPreviouslySelectedPanel(selected[0])
        shipmentContext?.dispatch({
          type: "SET_ACTIVE_STEP",
          payload: selected[0],
        })
      }
    },
    [setPreviouslySelectedPanel],
  )

  return (
    <Accordion
      defaultSelected={[previouslySelectedPanel]}
      // defaultSelected={[state.activeStep]}
      css={{ borderTop: 0 }}
      onSelectedChange={handleSelectedChange}
    >
      <AccordionItemWrapper
        title="1. Address Information"
        content="Content 1"
        nextStep="shipment"
        data={shipmentContext?.state.info}
      />
      <AccordionItemWrapper
        title="2. Shipment Details"
        content="Content 2"
        nextStep="summary"
        data={shipmentContext?.state.shipment}
      />
      <AccordionItemWrapper
        title="3. Summary"
        content="Content 3"
        nextStep="confirmation"
        data={shipmentContext?.state.summary}
      />
      <AccordionItemWrapper
        title="4. Confirmation"
        content="Content 4"
        data={shipmentContext?.state.confirmation}
      />
    </Accordion>
  )
}

const AccordionItemWrapper = ({
  title,
  content,
  nextStep,
  data,
}: {
  data?: IStep
  title: string
  content: string
  nextStep?: string
}) => {
  const navigate = useNavigate()
  const { setSelected } = useAccordionContext("AccordionItemWrapper")
  const shipmentContext = useShipmentContext()

  const handleSelect = (nextStep: string) => {
    setSelected([nextStep])

    if (data?.name === "info") {
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "info",
          completed: true,
          disabled: false,
        },
      })
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "shipment",
          completed: false,
          disabled: false,
        },
      })
    }

    if (data?.name === "shipment") {
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "shipment",
          completed: true,
          disabled: false,
        },
      })
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "summary",
          completed: false,
          disabled: false,
        },
      })
    }

    if (data?.name === "summary") {
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "summary",
          completed: true,
          disabled: false,
        },
      })
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "confirmation",
          completed: false,
          disabled: false,
        },
      })
    }

    if (data?.name === "confirmation") {
      shipmentContext?.dispatch({
        type: "SET_STEP_DATA",
        payload: {
          name: "confirmation",
          completed: true,
          disabled: false,
        },
      })
    }
  }

  return (
    <AccordionItem value={data?.name || ""} disabled={data?.disabled}>
      <AccordionHeader scale={4} thin>
        <AccordionButton
          size="large"
          compact
          css={{
            hover: {
              backgroundColor: "$system-white",
            },
          }}
        >
          {title}
        </AccordionButton>
      </AccordionHeader>
      <AccordionPanel contentCss={{ padding: 0 }}>
        <Box>{content}</Box>
        <Spacer size={32} />
        <Button onClick={() => (nextStep ? handleSelect(nextStep) : navigate("/"))}>
          {nextStep ? "Continue" : "Finish"}
        </Button>
        <Spacer size={32} />
      </AccordionPanel>
    </AccordionItem>
  )
}
