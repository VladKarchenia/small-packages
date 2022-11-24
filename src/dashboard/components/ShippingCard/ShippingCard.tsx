import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  ButtonIcon,
  Copy,
  Divider,
  Dropdown,
  DropdownItem,
  Flex,
  Spacer,
  Stack,
  StatusLabel,
} from "@/shared/components"
import { IconMore } from "@/shared/icons"
import { ShippingType } from "@/shipment"
import { SShippingCard } from "./ShippingCard.styles"
import { useModalActions } from "@/shared/hooks"
import { ShipmentStatus } from "@/shared/types"

interface IShipping {
  code: string
}

interface IShippingCard {
  booking: IShipping
  shippingType: ShippingType
}

export const ShippingCard = ({ booking, shippingType }: IShippingCard) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { code } = booking
  const { open } = useModalActions()
  const navigate = useNavigate()

  const handleEditClick = () => {
    // TODO: navigate to edit shipment/quote stepper page
    shippingType === ShippingType.Quote ? navigate("/tracking") : navigate("/tracking")
  }

  const handleCancelClick = (event: Event) => {
    event.stopPropagation()
    // TODO: need to set as an active shipment/quote some data to be able to use it inside cancellation modal (like ID, etc.)
    shippingType === ShippingType.Quote ? open("cancelQuote") : open("cancelShipment")
  }

  const handleDeleteClick = () => {
    // TODO: need to set as an active shipment/quote some data to be able to use it inside cancellation modal (like ID, etc.)
    shippingType === ShippingType.Quote ? open("deleteQuote") : open("deleteShipment")
  }

  return (
    <SShippingCard href={"/tracking"}>
      <Flex align="start" justify="between" css={{ width: "100%", paddingBottom: "$16" }}>
        <Box>
          <Flex align="baseline">
            <Copy scale={9} color="system-black" bold>
              #{code}-5Z
            </Copy>
            {shippingType === ShippingType.Shipment ? (
              <>
                <Spacer size={16} horizontal />
                <StatusLabel status={ShipmentStatus.Confirmed} />
              </>
            ) : null}
          </Flex>
          <Spacer size={4} />
          <Copy scale={9}>18.10.2022</Copy>
          {/* <Copy scale={9}>{booking.date}</Copy> */}
        </Box>
        <Dropdown
          asChild
          trigger={
            <ButtonIcon
              type="button"
              ariaLabel="Show more button"
              icon={<IconMore fixedSize width={4} height={20} />}
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          }
          open={isActionDropdownOpen}
          onOpenChange={() => setActionDropdownOpen(!isActionDropdownOpen)}
          contentCss={{
            paddingY: "$0",
            borderRadius: "$8",
          }}
          // disabled={disabled}
        >
          <Stack space={0} dividers>
            <DropdownItem key={"Edit"} label={"Edit"} onSelect={handleEditClick} />
            <DropdownItem key={"Cancel"} label={"Cancel"} onSelect={handleCancelClick} />
            <DropdownItem key={"Delete"} label={"Delete"} onSelect={handleDeleteClick} />
          </Stack>
        </Dropdown>
      </Flex>
      <Divider />
      <ShippingCardInfo shippingType={shippingType} />
    </SShippingCard>
  )
}

const ShippingCardInfo = ({ shippingType }: { shippingType: ShippingType }) => {
  if (shippingType === ShippingType.Quote) {
    return (
      <Stack space={12} css={{ marginTop: "$16" }}>
        <ShippingCardInfoLine
          title="Origin address"
          value="3376 San Diego Ave. Larnor, Dallaver, USA"
        />
        <ShippingCardInfoLine
          title="Destination address"
          value="4517 Washington Ave. Manor, Dallaver, USA"
        />
      </Stack>
    )
  }

  return (
    <Stack space={12} css={{ marginTop: "$16" }}>
      <ShippingCardInfoLine title="Sender's name" value="Pablo Diego José Francisco Picasso" />
      <ShippingCardInfoLine
        title="Recipient's name"
        value="Juan Nepomuceno María de los Remedios"
      />
      <ShippingCardInfoLine
        title="Destination address"
        value="4517 Washington Ave. Manor, Dallaver, USA"
      />
    </Stack>
  )
}

const ShippingCardInfoLine = ({ title, value }: { title: string; value: string }) => (
  <Flex align="center" justify="between">
    <Copy scale={9} css={{ paddingRight: "$32", minWidth: "max-content" }}>
      {title}
    </Copy>
    <Copy
      scale={9}
      color="system-black"
      css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
    >
      {value}
    </Copy>
  </Flex>
)
