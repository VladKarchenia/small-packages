import { useState } from "react"

import { useModalActions } from "@/shared/hooks"
import { Role } from "@/shared/types"
import { ShippingType } from "@/shipment"

import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconChevronHorizontal } from "@/shared/icons"

interface IEditActionsButtonProps {
  shippingType: ShippingType | null
}

export const EditActionsButton = ({ shippingType }: IEditActionsButtonProps) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { open } = useModalActions()

  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

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
          ariaLabel="Edit actions button"
          icon={<IconChevronHorizontal fixedSize width={20} height={20} />}
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
        {/* TODO: add moew conditions */}
        {role === Role.Admin || role === Role.Ops ? (
          <DropdownItem
            key={"Delete"}
            label={shippingType === ShippingType.Quote ? "Delete a quote" : "Delete a shipment"}
            onSelect={handleDeleteClick}
          />
        ) : null}

        <DropdownItem
          key={"Cancel"}
          label={shippingType === ShippingType.Quote ? "Cancel a quote" : "Cancel a shipment"}
          onSelect={handleCancelClick}
        />
      </Stack>
    </Dropdown>
  )
}
