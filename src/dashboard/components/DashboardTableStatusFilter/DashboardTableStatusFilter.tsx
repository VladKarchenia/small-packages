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

const shipmentStatusesList: ShipmentStatus[] = Object.values(ShipmentStatus)

export const DashboardTableStatusFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useDashboardStateContext()
  const { setStatusFilter, resetFilterField } = useDashboardActionContext()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      const newArray = status.filter((status) => status !== event.currentTarget.value)
      return setStatusFilter(newArray)
    }

    const newArray = [...status, event.currentTarget.value as ShipmentStatus]
    return setStatusFilter(newArray)
  }

  const handleCheckAllClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.checked) {
      return resetFilterField("status")
    }

    return setStatusFilter(shipmentStatusesList)
  }

  useEffect(() => {
    if (status.length === shipmentStatusesList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [status])

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
        onInteractOutside={(e) => {
          // if (isClearButtonClick(e)) {
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
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <Box
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
            value={"All"}
            onChange={handleCheckAllClick}
            name={"Select all"}
            id={"Select all"}
            label={"Select all"}
            checked={isCheckAll}
          />
        </Box>
        <Divider />
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
              checked={status.includes(item)}
            />
          </Box>
        ))}
      </PopoverContent>
    </Popover>
  )
}
