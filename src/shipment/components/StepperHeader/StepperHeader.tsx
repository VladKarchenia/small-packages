import { useLocation, useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { useAuthStore, useBoundStore } from "@/store"
import { useCreateShipment, useUpdateShipment } from "@/shipment/hooks"
import { useModalActions } from "@/shared/hooks"
import { getPrevStep } from "@/shipment/utils"
import { IShipmentResponse } from "@/api/types"
import { Role, ShippingType, ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"
import { HOME, TRACKING } from "@/constants"

import { Box, Button, Flex, HeaderBar, Hidden, useStepperContext } from "@/shared/components"
import { EditActionsButton } from "@/shipment/components"

export const StepperHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  const { selected, setSelected } = useStepperContext("StepperHeader")
  const shippingType = useBoundStore((state) => state.shippingType)
  const user = useAuthStore((state) => state.user)
  const role = user.authorities?.[0]?.authority
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM
  // TODO: add on the shipment page
  // const isLastStep =
  //   (shippingType === ShippingType.Quote && selected[0] === StepName.RATES) ||
  //   (shippingType === ShippingType.Shipment && selected[0] === StepName.RATES)
  const isLastStep = shippingType === ShippingType.Quote && selected[0] === StepName.RATES
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")
  const { open } = useModalActions()

  const { getValues } = useFormContext<ShipmentState>()

  const { mutate: createShipment } = useCreateShipment()
  const { mutate: updateShipment } = useUpdateShipment()

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate(HOME)
    }

    const prevStep = getPrevStep({ shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return (
    <Flex align={{ "@initial": "center", "@sm": "start" }} justify="between">
      <HeaderBar title={title} onClick={onBackHandler} />

      <Hidden below="sm">
        <Flex css={{ "@sm": { gap: "$16" } }}>
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
                  {shippingType === ShippingType.Quote ? "Delete a quote" : "Delete a shipment"}
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
                {shippingType === ShippingType.Quote ? "Cancel a quote" : "Cancel a shipment"}
              </Button>
            </>
          ) : null}
          {/* TODO: add more conditions */}
          {isLastStep ? (
            <Button
              action="secondary"
              disabled={false}
              onClick={() =>
                isEditMode
                  ? updateShipment(getValues(), {
                      onSuccess: (data: IShipmentResponse) => {
                        if (shippingType === ShippingType.Quote) {
                          navigate(`${TRACKING}/${shippingType}/${data.id}`)
                        }
                        // TODO: else navigate to edit shipment page
                        //  else {
                        //   navigate(`${TRACKING}/${data.id}`)
                        // }
                      },
                    })
                  : createShipment(getValues(), {
                      onSuccess: (data: IShipmentResponse) => {
                        if (shippingType === ShippingType.Quote) {
                          navigate(`${TRACKING}/${shippingType}/${data.id}`)
                        }
                        // TODO: else navigate to edit shipment page
                        //  else {
                        //   navigate(`${TRACKING}/${data.id}`)
                        // }
                      },
                    })
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
              Save
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
