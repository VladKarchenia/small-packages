import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useBoundStore } from "@/store"
import { ShippingType } from "@/shared/types"
import { CREATE } from "@/constants"

import { Button, Dropdown, DropdownItem, Stack } from "@/shared/components"
import { IconPlus } from "@/shared/icons"

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
      asChild
      trigger={
        <Button
          action="primary"
          type="button"
          ariaLabel="Create button"
          suffix={<IconPlus />}
          css={{
            height: "$40",
            padding: "$0 $24",
            cursor: "pointer",
          }}
        >
          Create
        </Button>
      }
      open={isCreateDropdownOpen}
      onOpenChange={() => setCreateDropdownOpen(!isCreateDropdownOpen)}
      triggerCss={{
        position: "absolute",
        // (-$80 + -$2) - the absolute position of the button over the parent container
        top: `calc(-$80 + -$2)`,
        right: 0,
      }}
    >
      <Stack space={0}>
        <DropdownItem key="Quote" label="Quote" onSelect={() => handleClick(ShippingType.Quote)} />
        <DropdownItem
          key="Shipment"
          label="Shipment"
          onSelect={() => handleClick(ShippingType.Shipment)}
        />
      </Stack>
    </Dropdown>
  )
}
