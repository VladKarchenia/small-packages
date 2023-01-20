import { useMutation } from "react-query"
import { useFormContext } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { ShipmentState, useShipmentStateContext } from "@/shared/state"
import { createShipmentFn, updateShipmentFn } from "@/api/shipmentApi"
import { formatShipmentRequestData } from "@/shared/utils"
import { RouteParams, ShipmentStatus } from "@/shared/types"
import { IShipmentResponse } from "@/api/types"

import { Button, Copy, Flex, Hidden, Link, Spacer, useStepperContext } from "@/shared/components"
import { StepName, ShippingType, StepActionsBar } from "@/shipment"

export const StepperFooter = () => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const { shippingType } = useShipmentStateContext()
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

  // TODO: move it to the hook
  const { mutate: createShipment } = useMutation(
    (data: ShipmentState) =>
      createShipmentFn(formatShipmentRequestData(data, shippingType, ShipmentStatus.QUOTE_QUOTED)),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        if (shippingType === ShippingType.Quote) {
          navigate(`/tracking/${id}`)
        }
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

  if (!isLastStep) return null

  if (shippingType === ShippingType.Quote) {
    return (
      <Flex direction="column" css={{ paddingX: "$16" }}>
        <Spacer size={{ "@initial": 24, "@sm": 32 }} />
        <StepActionsBar>
          <Flex css={{ gap: "$16" }}>
            <Button type="submit" full disabled={!date}>
              <Copy as="span" scale={8} color="system-white" bold>
                Create a shipment
              </Copy>
            </Button>
            {/* TODO: different requests for create and edit mode, also need to define if this button is disabled based on fields value */}
            {/* TODO: after save request need to redirect to the quote details page */}
            <Button
              action="secondary"
              full
              disabled={false}
              onClick={() =>
                isEditMode ? updateShipment(getValues()) : createShipment(getValues())
              }
              css={{ "@sm": { display: "none" } }}
            >
              <Copy as="span" scale={8} color="system-black" bold>
                Save
              </Copy>
            </Button>
          </Flex>
        </StepActionsBar>

        <Hidden above="sm">
          <Spacer size={20} />
          <Link href="/" css={{ width: "100%" }}>
            <Copy scale={8} color="system-black" bold>
              Back to Home page
            </Copy>
          </Link>
          <Spacer size={24} />
        </Hidden>
      </Flex>
    )
  }

  return (
    <Flex direction="column" css={{ paddingX: "$16" }}>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Button type="submit" full onClick={() => navigate(`/tracking/${shipmentId}`)}>
          <Copy as="span" scale={8} color="system-white" bold>
            Continue
          </Copy>
        </Button>
      </StepActionsBar>

      {/* TODO: Add print button Here */}

      <Hidden above="sm">
        <Spacer size={16} />
        <Link href="/" css={{ width: "100%" }}>
          <Copy scale={8} color="system-black" bold>
            Back to Home page
          </Copy>
        </Link>
        <Spacer size={24} />
      </Hidden>
    </Flex>
  )
}
