import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Copy, Dropdown, DropdownItem, Spacer, Stack } from "@/shared/components"
import { IconPlus } from "@/shared/icons"
import { SCreateButton } from "./CreateButton.styles"

export const CreateButton = () => {
  const [isCreateDropdownOpen, setCreateDropdownOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <Dropdown
      asChild
      trigger={
        <SCreateButton type="button">
          <Copy as="span" scale={8} color="system-white" bold>
            Create
          </Copy>
          <Spacer size={8} horizontal />
          <IconPlus fixedSize width={20} height={20} css={{ color: "$system-white" }} />
        </SCreateButton>
      }
      open={isCreateDropdownOpen}
      onOpenChange={() => setCreateDropdownOpen(!isCreateDropdownOpen)}
      contentCss={{
        paddingY: "$0",
        borderRadius: "$8",
      }}
    >
      <Stack space={0}>
        <DropdownItem key={"Quote"} label={"Quote"} onSelect={() => navigate("/create/quote")} />
        <DropdownItem
          key={"Shipment"}
          label={"Shipment"}
          onSelect={() => navigate("/create/shipment")}
        />
      </Stack>
    </Dropdown>
  )
}
