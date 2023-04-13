import { useLocation, useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { useCreateShipment, useUpdateShipment } from "@/shipment/hooks"
import { IShipmentResponse } from "@/api/types"
import { ShippingType, ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"
import { EDIT, TRACKING } from "@/constants"

import {
  Copy,
  GridContainer,
  Stack,
  Spacer,
  Button,
  useStepperContext,
  ShortInfoLine,
  PersonInfoShort,
  Grid,
  Flex,
  Hidden,
  Title,
} from "@/shared/components"
import { IconClock, IconTruck } from "@/shared/icons"
import { StepActionsBar } from "@/shipment/components"

import { SGridItem } from "./Summary.styles"

export const Summary = ({
  handleContinueClick,
}: {
  handleContinueClick?: (step: StepName.SUMMARY, nextStep: StepName.RECEIPT) => void
}) => {
  const navigate = useNavigate()
  const [shippingType, setShippingType] = useBoundStore(
    (state) => [state.shippingType, state.setShippingType],
    shallow,
  )
  const { handleSubmit, watch } = useFormContext<ShipmentState>()
  const { sender, recipient, rate, date, packaging, parcels } = watch()

  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const senderTimeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude) || 0,
    parseFloat(sender.fullAddress.longitude) || 0,
  )
  const recipientTimeZone = tzlookup(
    parseFloat(recipient.fullAddress.latitude) || 0,
    parseFloat(recipient.fullAddress.longitude) || 0,
  )

  const { mutate: createShipment } = useCreateShipment()
  const { mutate: updateShipment } = useUpdateShipment()

  const onSubmitHandler = (data: ShipmentState) =>
    isEditMode
      ? updateShipment(data, {
          onSuccess: (data: IShipmentResponse) => {
            if (shippingType === ShippingType.Quote) {
              setShippingType(ShippingType.Shipment)
              navigate(`${EDIT}/shipment/${data.id}`)
            } else {
              navigate(`${TRACKING}/${shippingType}/${data.id}`)
            }
          },
        })
      : createShipment(data, {
          onSuccess: (data: IShipmentResponse) => {
            // TODO: need first to add condition to unblock steps
            navigate(`${EDIT}/shipment/${data.id}`)
            setSelected([StepName.RECEIPT])
            if (handleContinueClick) {
              handleContinueClick(StepName.SUMMARY, StepName.RECEIPT)
            }
          },
        })

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
      <Hidden below="sm">
        <Title as="h3" scale={3}>
          Summary
        </Title>
        <Spacer size={40} />
      </Hidden>
      <Grid columns={{ "@initial": "1fr", "@md": "1fr 1fr" }} gap={{ "@initial": 24, "@sm": 16 }}>
        <SGridItem>
          <Copy scale={9} color="theme-n6-n3" fontWeight="bold">
            Ship From
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person="sender" sender={sender} />
        </SGridItem>
        <SGridItem>
          <Copy scale={9} color="theme-n6-n3" fontWeight="bold">
            Ship To
          </Copy>
          <Spacer size={16} />
          <PersonInfoShort person="recipient" recipient={recipient} />
        </SGridItem>
        <SGridItem>
          <Copy scale={9} color="theme-n6-n3" fontWeight="bold">
            Shipment details
          </Copy>
          <Spacer size={16} />
          <Stack space={8} css={{ color: "$theme-b-n5" }}>
            <Copy>{`Pickup type: ${packaging.pickupType}`}</Copy>
            <Copy>{`Package type: ${packaging.packagingType}`}</Copy>
            <Copy>{`Contents: ${packaging.packageContent}`}</Copy>
            <Copy>{`Number of packages: ${packaging.totalPackagesNumber}`}</Copy>
            <Copy>
              {`Total weight: ${Object.values(parcels)
                .reduce((sum, i) => (sum += parseFloat(i.weight) * i.quantity), 0)
                .toFixed(1)} lb`}
            </Copy>
            <Copy>
              {`Total Declared Value: $${Object.values(parcels)
                .reduce((sum, i) => (sum += parseInt(i.totalPrice) * i.quantity), 0)
                .toFixed(0)}`}
            </Copy>
          </Stack>
        </SGridItem>
        <SGridItem>
          <Stack space={24} css={{ color: "$theme-b-n5" }}>
            <>
              <Copy scale={9} color="theme-n6-n3" fontWeight="bold">
                Ready date
              </Copy>
              <Spacer size={16} />
              <ShortInfoLine
                icon={<IconClock />}
                text={formatInTimeZone(date, senderTimeZone, "MMM d, yyyy hh:mm aa (zzz)")}
              />
            </>
            <>
              <Copy scale={9} color="theme-n6-n3" fontWeight="bold">
                Delivery rates
              </Copy>
              <Spacer size={16} />
              <Stack space={12}>
                <ShortInfoLine icon={<IconTruck />} text={rate.name} />
                <Flex wrap css={{ gap: "$4" }}>
                  <Copy>
                    {/* TODO: fix this date&time to arrival, not pickup */}
                    Arrival date:
                  </Copy>
                  <Copy>
                    {formatInTimeZone(date, recipientTimeZone, "MMM d, yyyy hh:mm aa (zzz)")}
                  </Copy>
                </Flex>
                <Copy>Total price: ${rate.price}</Copy>
              </Stack>
            </>
          </Stack>
        </SGridItem>
      </Grid>

      <Spacer size={{ "@initial": 24, "@sm": 32 }} />

      <StepActionsBar>
        <Button full onClick={onContinueHandler}>
          Submit
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
