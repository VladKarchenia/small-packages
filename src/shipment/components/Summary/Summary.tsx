import { useFormContext } from "react-hook-form"
import { useMutation } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { createShipmentFn, updateShipmentFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { formatShipmentRequestData } from "@/shared/utils"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"

import { Copy, GridContainer, Stack, Spacer, Button, useStepperContext } from "@/shared/components"
import { ShippingType, StepActionsBar, StepName } from "@/shipment"
import { TrackingRouteParams } from "@/tracking/types"
import { ShipmentStatus } from "@/shared/types"

export const Summary = ({
  handleContinueClick,
}: {
  handleContinueClick?: (step: StepName.SUMMARY, nextStep: StepName.RECEIPT) => void
}) => {
  const { shipmentId } = useParams<keyof TrackingRouteParams>() as TrackingRouteParams
  const navigate = useNavigate()
  const { shippingType } = useShipmentStateContext()
  const { setShipmentData, setShippingType } = useShipmentActionContext()
  const { handleSubmit } = useFormContext<ShipmentState>()

  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const { mutate: createShipment, isLoading } = useMutation(
    (data: ShipmentState) => createShipmentFn(formatShipmentRequestData(data, shippingType)),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        // TODO: need first to add condition to unblock steps
        // navigate(`/edit/shipment/${id}`)
        // setSelected([StepName.RECEIPT])
        // if (handleContinueClick) {
        //   handleContinueClick(StepName.SUMMARY, StepName.RECEIPT)
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
          shippingType === ShippingType.Quote ? ShipmentStatus.DRAFT : ShipmentStatus.CONFIRMED,
        ),
      ),
    {
      onSuccess: ({ id }: IShipmentResponse) => {
        if (shippingType === ShippingType.Quote) {
          setShippingType(ShippingType.Shipment)
          navigate(`/edit/shipment/${id}`)
        } else {
          navigate(`/tracking/${id}`)
        }
      },
    },
  )

  const onSubmitHandler = (data: ShipmentState) => {
    setShipmentData({
      sender: data.sender,
      senderReturn: data.senderReturn,
      recipient: data.recipient,
      parcels: data.parcels,
      date: data.date,
      rate: data.rate,
      shippingType: data.shippingType,
      shipmentStatus: data.shipmentStatus,
      currentLocation: {
        displayName: "",
        latitude: "",
        longitude: "",
      },
      hasReturnAddress: data.hasReturnAddress,
    })
    isEditMode ? updateShipment(data) : createShipment(data)
  }

  const { setSelected } = useStepperContext("ShipmentSummaryDetails")

  const onContinueHandler = () => {
    handleSubmit(onSubmitHandler)()
    setSelected([StepName.RECEIPT])
    if (handleContinueClick) {
      handleContinueClick(StepName.SUMMARY, StepName.RECEIPT)
    }
  }

  return (
    <GridContainer fullBleed>
      <Stack space={12}>
        <Copy scale={9}>Summary</Copy>
      </Stack>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Button full onClick={onContinueHandler}>
          <Copy as="span" scale={8} color="system-white" bold>
            Submit
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
