import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconChevronHorizontal, IconMore } from "@/shared/icons"
import { ShippingType } from "@/shipment"
import { useModalActions } from "@/shared/hooks"
import { Role } from "@/shared/types"

interface IActionDetailsButtonProps {
  shippingType: ShippingType
  shipmentId: string
  horizontal?: boolean
}

export const ActionDetailsButton = ({
  shippingType,
  shipmentId,
  horizontal,
}: IActionDetailsButtonProps) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { open } = useModalActions()
  const navigate = useNavigate()

  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  const handleEditClick = () => {
    shippingType === ShippingType.Quote
      ? navigate(`edit/quote/${shipmentId}`)
      : navigate(`edit/shipment/${shipmentId}`)
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
    <Dropdown
      asChild
      trigger={
        <ButtonIcon
          type="button"
          ariaLabel="Show more button"
          icon={
            horizontal ? (
              <IconChevronHorizontal fixedSize width={20} height={20} />
            ) : (
              <IconMore fixedSize width={20} height={20} />
            )
          }
          css={{ height: "100%", cursor: "pointer" }}
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
        {role === Role.Admin || role === Role.Ops ? (
          <DropdownItem key={"Delete"} label={"Delete"} onSelect={handleDeleteClick} />
        ) : null}
      </Stack>
    </Dropdown>
  )
}
