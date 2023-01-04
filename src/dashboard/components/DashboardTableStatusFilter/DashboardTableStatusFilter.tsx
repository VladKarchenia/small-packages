import { useEffect, useRef, useState } from "react"
import {
  Box,
  Copy,
  Divider,
  FormCheckbox,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spacer,
} from "@/shared/components"
import { IconChevronDown } from "@/shared/icons"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { ShipmentStatus } from "@/shared/types"
import { SStatusFilterButton } from "./DashboardTableStatusFilter.styles"

const getEnumKey = (value: any) =>
  Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(value)]

const shipmentStatuses = [
  ShipmentStatus.COMPLETED,
  ShipmentStatus.CONFIRMED,
  ShipmentStatus.DELIVERED,
  ShipmentStatus.DRAFT,
  ShipmentStatus.IN_DELIVERY,
  ShipmentStatus.SUBMIT_READY,
  ShipmentStatus.CANCELLED,
]

const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus).filter((status) =>
  shipmentStatuses.includes(status),
)

export const DashboardTableStatusFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useDashboardStateContext()
  const { setStatusFilter } = useDashboardActionContext()
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = status.filter((status) => status !== getEnumKey(event.currentTarget.value))
      return setStatusFilter(newArray)
    }

    const newArray = [...status, getEnumKey(event.currentTarget.value) as ShipmentStatus]
    return setStatusFilter(newArray)
  }

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <SStatusFilterButton
          ref={triggerRef}
          onClick={() => {
            if (!isOpen) {
              return setIsOpen(true)
            }
          }}
          onFocus={() => {
            if (!isOpen) {
              return setIsOpen(true)
            }
          }}
        >
          <Copy as="span" scale={8} color="neutrals-8" bold>
            Status
          </Copy>
          <Spacer size={16} horizontal />
          <IconChevronDown fixedSize width={20} height={20} />
        </SStatusFilterButton>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ width: "220px", padding: "$0", border: "none", borderRadius: "$8" }}
        alignOffset={-1}
        onInteractOutside={(e: any) => {
          // if (isClearButtonClick(e: any)) {
          //   if (e.detail.originalEvent.isTrusted) {
          //     handleClearButton()
          //   }
          //   return
          // }
          if (isTriggerClick(e)) {
            return
          }
          return setIsOpen(false)
        }}
        onOpenAutoFocus={(e: any) => {
          e.preventDefault()
        }}
      >
        {shipmentStatusesList.map((item) => (
          <Box
            key={item}
            css={{
              "> label": {
                padding: "$12 $16",
                cursor: "pointer",
                hover: {
                  backgroundColor: "$neutrals-3",
                },
              },
            }}
          >
            <FormCheckbox
              value={item}
              onChange={handleChange}
              name={item}
              id={item}
              label={item}
              checked={status.includes(getEnumKey(item) as ShipmentStatus)}
            />
          </Box>
        ))}
      </PopoverContent>
    </Popover>
  )
}
