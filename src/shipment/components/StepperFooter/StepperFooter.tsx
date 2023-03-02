import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import { useCreateShipment, useUpdateShipment } from "@/shipment/hooks"
import { IShipmentResponse } from "@/api/types"
import { RouteParams, ShippingType, ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"
import { HOME, TRACKING } from "@/constants"

import { Button, Copy, Flex, Hidden, Link, Spacer, useStepperContext } from "@/shared/components"
import { StepActionsBar } from "@/shipment/components"

export const StepperFooter = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const shippingType = useBoundStore((state) => state.shippingType)
  const navigate = useNavigate()
  const { watch, getValues } = useFormContext<ShipmentState>()
  const { date } = watch()
  const { selected } = useStepperContext("StepperFooter")
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const isLastStep =
    shippingType === ShippingType.Quote
      ? selected[0] === StepName.RATES
      : selected[0] === StepName.RECEIPT

  const { mutate: createShipment } = useCreateShipment()
  const { mutate: updateShipment } = useUpdateShipment()

  if (!isLastStep) return null

  return (
    <Flex direction="column" css={{ paddingX: "$16" }}>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Flex css={{ gap: "$16" }}>
          {shippingType === ShippingType.Quote ? (
            <Button type="submit" full disabled={!date}>
              <Copy as="span" scale={8} color="system-white" bold>
                Create a shipment
              </Copy>
            </Button>
          ) : (
            <Button
              type="submit"
              full
              onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}`)}
            >
              <Copy as="span" scale={8} color="system-white" bold>
                Continue
              </Copy>
            </Button>
          )}

          {/* TODO: different requests for create and edit mode, also need to define if this button is disabled based on fields value */}
          {/* TODO: after save request need to redirect to the quote details page */}
          {shippingType === ShippingType.Quote ? (
            <Button
              action="secondary"
              full
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
              css={{ "@sm": { display: "none" } }}
            >
              <Copy as="span" scale={8} color="system-black" bold>
                Save
              </Copy>
            </Button>
          ) : null}
        </Flex>
      </StepActionsBar>

      {/* TODO: Add print button Here */}

      <Hidden above="sm">
        <Spacer size={20} />
        <Link onClick={() => navigate(HOME)} css={{ width: "100%" }}>
          <Copy scale={8} color="system-black" bold>
            Back to Home page
          </Copy>
        </Link>
        <Spacer size={24} />
      </Hidden>
    </Flex>
  )
}
