import { useFormContext } from "react-hook-form"
import { useMutation } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import format from "date-fns/format"

import { createShipmentFn, updateShipmentFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { IParcel, RouteParams, ShipmentStatus } from "@/shared/types"
import { formatShipmentRequestData } from "@/shared/utils"
import { ShipmentState, useShipmentActionContext, useShipmentStateContext } from "@/shared/state"

import {
  Copy,
  GridContainer,
  Stack,
  Spacer,
  Button,
  useStepperContext,
  Flex,
  ShortInfoLine,
  PersonInfoShort,
  Grid,
} from "@/shared/components"
import { IconCalendar } from "@/shared/icons"
import { ShippingType, StepActionsBar, StepName } from "@/shipment"

import { SGridItem } from "./Summary.styles"

export const Summary = ({
  handleContinueClick,
}: {
  handleContinueClick?: (step: StepName.SUMMARY, nextStep: StepName.RECEIPT) => void
}) => {
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const navigate = useNavigate()
  const { shippingType } = useShipmentStateContext()
  const { setShipmentData, setShippingType } = useShipmentActionContext()
  const { handleSubmit, watch } = useFormContext<ShipmentState>()
  const { sender, recipient, rate, date, parcels } = watch()

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
      <Grid columns={{ "@initial": "1fr", "@md": "1fr 1fr" }} gap={{ "@initial": 24, "@sm": 16 }}>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship From
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"sender"} sender={sender} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Ship To
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person={"recipient"} recipient={recipient} />
        </SGridItem>
        <SGridItem>
          <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
            Shipment details
          </Copy>
          <Spacer size={16} />
          <Stack space={12}>
            {parcels.map((parcel: IParcel, index: number) => (
              <Stack space={8} key={index}>
                {parcels.length > 1 ? (
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black" bold>
                    Parcel {index + 1}
                  </Copy>
                ) : null}
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Contents: </span> {parcel.content}
                </Copy>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  <span color={"$neutrals-7"}>Total Declared Value: </span> ${parcel.totalPrice}
                </Copy>
                <Flex align="center">
                  <Flex align="center" justify="center">
                    <IconCalendar size="xs" />
                  </Flex>
                  <Spacer size={8} horizontal />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height}{" "}
                    in;
                  </Copy>
                  <Spacer size={8} horizontal />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {parcel.weight} lb
                  </Copy>
                </Flex>
              </Stack>
            ))}
          </Stack>
        </SGridItem>
        <SGridItem>
          <Stack space={24}>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Ready date
              </Copy>
              <Spacer size={16} />
              <ShortInfoLine
                icon={<IconCalendar size="xs" />}
                text={format(date, "MMM d, yyyy hh:mm aa (OOO)")}
              />
            </>
            <>
              <Copy scale={{ "@initial": 11, "@sm": 9 }} bold>
                Delivery rates
              </Copy>
              <Spacer size={16} />
              <Stack space={12}>
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  Arrival date: {format(date, "MMM d, yyyy hh:mm aa (OOO)")}
                </Copy>
                <ShortInfoLine icon={<IconCalendar size="xs" />} text={rate.name} />
                <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                  Total price: ${rate.price}
                </Copy>
              </Stack>
            </>
          </Stack>
        </SGridItem>
      </Grid>

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
