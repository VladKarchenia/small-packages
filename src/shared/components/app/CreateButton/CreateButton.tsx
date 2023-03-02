import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useBoundStore } from "@/store"
import { ShippingType } from "@/shared/types"
import { CREATE } from "@/constants"

import { Copy, Dropdown, DropdownItem, Spacer, Stack } from "@/shared/components"
import { IconPlus } from "@/shared/icons"

import { SCreateButton } from "./CreateButton.styles"

export const CreateButton = () => {
  const [isCreateDropdownOpen, setCreateDropdownOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const setShippingType = useBoundStore((state) => state.setShippingType)

  const handleClick = (type: ShippingType) => {
    setShippingType(type)
    navigate(`${CREATE}/${type}`)
  }

  return (
    <Dropdown
      trigger={
        <SCreateButton>
          <Copy as="span" scale={8} color="system-white" bold>
            Create
          </Copy>
          <Spacer size={8} horizontal />
          <IconPlus css={{ color: "$system-white" }} />
        </SCreateButton>
      }
      open={isCreateDropdownOpen}
      onOpenChange={() => setCreateDropdownOpen(!isCreateDropdownOpen)}
      triggerCss={{
        position: "absolute",
        // (-$80 + -$2) - the absolute position of the button over the parent container
        top: `calc(-$80 + -$2)`,
        right: 0,
      }}
      contentCss={{
        paddingY: 0,
        borderRadius: "$8",
      }}
    >
      <Stack space={0}>
        <DropdownItem
          key="Quote"
          label="Quote"
          onSelect={() => handleClick(ShippingType.Quote)}
        />
        <DropdownItem
          key="Shipment"
          label="Shipment"
          onSelect={() => handleClick(ShippingType.Shipment)}
        />
      </Stack>
    </Dropdown>
  )
}
