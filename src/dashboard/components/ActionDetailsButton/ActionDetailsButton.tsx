import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconMore } from "@/shared/icons"
import { ShippingType } from "@/shipment"
import { useModalActions } from "@/shared/hooks"
import { Role } from "@/shared/types"
import { useStateContext } from "@/shared/state"

interface IActionDetailsButtonProps {
  shippingType: ShippingType
}

export const ActionDetailsButton = ({ shippingType }: IActionDetailsButtonProps) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { open } = useModalActions()
  const navigate = useNavigate()

  const stateContext = useStateContext()
  const role = stateContext?.state.authUser?.role

  const handleEditClick = () => {
    // TODO: navigate to edit shipment/quote stepper page
    shippingType === ShippingType.Quote ? navigate("/tracking") : navigate("/tracking")
  }

  const handleEliminateClick = (event: Event) => {
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
          icon={<IconMore fixedSize width={20} height={20} />}
          css={{ cursor: "pointer" }}
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
        <DropdownItem key={"Eliminate"} label={"Eliminate"} onSelect={handleEliminateClick} />
        {role === Role.Admin ? (
          <DropdownItem key={"Delete"} label={"Delete"} onSelect={handleDeleteClick} />
        ) : null}
      </Stack>
    </Dropdown>
  )
}
