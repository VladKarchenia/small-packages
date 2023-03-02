import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/store"
import { useModalActions } from "@/shared/hooks"
import { Role, ShippingType } from "@/shared/types"

import { ButtonIcon, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconMoreHorizontal, IconMoreVertical } from "@/shared/icons"

interface IActionDetailsButtonProps {
  tab: ShippingType
  shipmentId: string
  horizontal?: boolean
}

export const ActionDetailsButton = ({ tab, shipmentId, horizontal }: IActionDetailsButtonProps) => {
  const [isActionDropdownOpen, setActionDropdownOpen] = useState<boolean>(false)
  const { open } = useModalActions()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const role = user?.authorities?.[0]?.authority

  const handleEditClick = () => {
    tab === ShippingType.Quote
      ? navigate(`edit/quote/${shipmentId}`)
      : navigate(`edit/shipment/${shipmentId}`)
  }

  const handleCancelClick = () => {
    // TODO: need to set as an active shipment/quote some data to be able to use it inside cancellation modal (like ID, etc.)
    tab === ShippingType.Quote ? open("cancelQuote") : open("cancelShipment")
  }

  const handleDeleteClick = () => {
    // TODO: need to set as an active shipment/quote some data to be able to use it inside cancellation modal (like ID, etc.)
    tab === ShippingType.Quote ? open("deleteQuote") : open("deleteShipment")
  }

  return (
    <Dropdown
      asChild
      trigger={
        <ButtonIcon
          type="button"
          ariaLabel="Show more button"
          icon={horizontal ? <IconMoreHorizontal /> : <IconMoreVertical />}
          css={{ height: "100%", cursor: "pointer" }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        />
      }
      open={isActionDropdownOpen}
      onOpenChange={() => setActionDropdownOpen(!isActionDropdownOpen)}
      contentCss={{
        paddingY: 0,
        borderRadius: "$8",
      }}
      // disabled={disabled}
    >
      <Stack space={0} dividers>
        <DropdownItem key="Edit" label="Edit" onSelect={handleEditClick} />
        <DropdownItem key="Cancel" label="Cancel" onSelect={handleCancelClick} />
        {role === Role.Admin || role === Role.Ops ? (
          <DropdownItem key="Delete" label="Delete" onSelect={handleDeleteClick} />
        ) : null}
      </Stack>
    </Dropdown>
  )
}
