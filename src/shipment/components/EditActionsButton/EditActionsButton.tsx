import React, { useState } from "react"

import { useAuthStore } from "@/store"
import { useModalActions } from "@/shared/hooks"
import { Role, ShippingType } from "@/shared/types"

import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconMoreHorizontal } from "@/shared/icons"

interface IEditActionsButtonProps {
  shippingType: ShippingType
}

export const EditActionsButton = ({ shippingType }: IEditActionsButtonProps) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { open } = useModalActions()
  const user = useAuthStore((state) => state.user)
  const role = user.authorities?.[0]?.authority

  const handleCancelClick = () => {
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
          icon={<IconMoreHorizontal />}
          ariaLabel="Edit actions button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          inputIcon
        />
      }
      open={isActionDropdownOpen}
      onOpenChange={() => setActionDropdownOpen(!isActionDropdownOpen)}
      // disabled={disabled}
    >
      <Stack space={0}>
        {/* TODO: add more conditions */}
        {role === Role.Admin || role === Role.Ops ? (
          <DropdownItem
            key="Delete"
            label={shippingType === ShippingType.Quote ? "Delete a quote" : "Delete a shipment"}
            onSelect={handleDeleteClick}
          />
        ) : null}

        <DropdownItem
          key="Cancel"
          label={shippingType === ShippingType.Quote ? "Cancel a quote" : "Cancel a shipment"}
          onSelect={handleCancelClick}
        />
      </Stack>
    </Dropdown>
  )
}
