import { useMutation } from "react-query"
import { useFormContext } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { createShipmentFn, updateShipmentFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { Role, RouteParams, ShipmentStatus } from "@/shared/types"
import { ShipmentState, useShipmentStateContext } from "@/shared/state"
import { useModalActions } from "@/shared/hooks"
import { formatShipmentRequestData } from "@/shared/utils"

import { Box, Button, Copy, Flex, HeaderBar, Hidden, useStepperContext } from "@/shared/components"
import { StepName, getPrevStep, ShippingType, EditActionsButton } from "@/shipment"

export const StepperHeader = ({ title }: { title: string }) => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const { shippingType } = useShipmentStateContext()
  const navigate = useNavigate()
  const { selected, setSelected } = useStepperContext("StepperHeader")
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM
  // TODO: add on the shipment page
  // const isLastStep =
  //   (shippingType === ShippingType.Quote && selected[0] === StepName.RATES) ||
  //   (shippingType === ShippingType.Shipment && selected[0] === StepName.RATES)
  const isLastStep = shippingType === ShippingType.Quote && selected[0] === StepName.RATES
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")
  const { open } = useModalActions()

  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  const { getValues } = useFormContext<ShipmentState>()

  const { mutate: createShipment } = useMutation(
    (data: ShipmentState) =>
      createShipmentFn(
        formatShipmentRequestData(
          data,
          shippingType,
          shippingType === ShippingType.Quote ? ShipmentStatus.QUOTE_QUOTED : ShipmentStatus.DRAFT,
        ),
      ),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        if (shippingType === ShippingType.Quote) {
          navigate(`/tracking/${id}`)
        }
        // TODO: else navigate to edit shipment page
        //  else {
        //   navigate(`/tracking/${id}`)
        // }
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
          shippingType === ShippingType.Quote ? ShipmentStatus.QUOTE_QUOTED : ShipmentStatus.DRAFT,
        ),
      ),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        if (shippingType === ShippingType.Quote) {
          navigate(`/tracking/${id}`)
        }
        // TODO: else navigate to edit shipment page
        //  else {
        //   navigate(`/tracking/${id}`)
        // }
      },
    },
  )

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate("/")
    }

    const prevStep = getPrevStep({ shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return (
    <Flex align={{ "@initial": "center", "@sm": "start" }} justify="between">
      <HeaderBar title={title} onClick={onBackHandler} />

      <Hidden below="sm">
        <Flex css={{ "@sm": { gap: "$16", paddingRight: "$16" } }}>
          {/* TODO: add moew conditions */}
          {isEditMode ? (
            <>
              {role === Role.Admin || role === Role.Ops ? (
                <Button
                  action="secondary"
                  disabled={false}
                  onClick={() =>
                    shippingType === ShippingType.Quote
                      ? open("deleteQuote")
                      : open("deleteShipment")
                  }
                  css={{
                    display: "none",
                    "@sm": {
                      display: "inline-flex",
                      minWidth: "$128",
                      width: "max-content",
                      height: "$40",
                      paddingX: "$12",
                    },
                  }}
                >
                  <Copy as="span" scale={8} color="system-black" bold>
                    {shippingType === ShippingType.Quote ? "Delete a quote" : "Delete a shipment"}
                  </Copy>
                </Button>
              ) : null}

              <Button
                action="secondary"
                disabled={false}
                onClick={() =>
                  shippingType === ShippingType.Quote ? open("cancelQuote") : open("cancelShipment")
                }
                css={{
                  display: "none",
                  "@sm": {
                    display: "inline-flex",
                    minWidth: "$128",
                    width: "max-content",
                    height: "$40",
                    paddingX: "$12",
                  },
                }}
              >
                <Copy as="span" scale={8} color="system-black" bold>
                  {shippingType === ShippingType.Quote ? "Cancel a quote" : "Cancel a shipment"}
                </Copy>
              </Button>
            </>
          ) : null}
          {/* TODO: add more conditions */}
          {isLastStep ? (
            <Button
              action="secondary"
              disabled={false}
              onClick={() =>
                isEditMode ? updateShipment(getValues()) : createShipment(getValues())
              }
              css={{
                display: "none",
                "@sm": {
                  display: "inline-flex",
                  minWidth: "$128",
                  width: "max-content",
                  height: "$40",
                  paddingX: "$12",
                },
              }}
            >
              <Copy as="span" scale={8} color="system-black" bold>
                Save
              </Copy>
            </Button>
          ) : null}
        </Flex>
      </Hidden>

      {isEditMode ? (
        <Hidden above="sm">
          <Box css={{ paddingRight: "$16", paddingLeft: "$4" }}>
            <EditActionsButton shippingType={shippingType} />
          </Box>
        </Hidden>
      ) : null}
    </Flex>
  )
}
