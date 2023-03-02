import { useRef, useState } from "react"

import { DashboardState, useDashboardActionContext } from "@/dashboard/state"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import { Copy, Pill, Popover, PopoverAnchor, PopoverContent } from "@/shared/components"
import { IconChevronDown, IconCross } from "@/shared/icons"

import { SStatusFilterButton } from "./DashboardTableFilter.styles"

interface IDashboardTableFilterProps {
  label: string
  name: keyof DashboardState
  amount: number
}

export const DashboardTableFilter: React.FC<
  React.PropsWithChildren<IDashboardTableFilterProps>
> = ({ children, label, name, amount }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)
  const pillRef = useRef<HTMLButtonElement>(null)
  const { resetFilterField } = useDashboardActionContext()
  const isLargeAndAbove = useMedia([mediaQueries.lg], [true], false)

  return (
    <Popover open={isOpen}>
      <PopoverAnchor asChild>
        <SStatusFilterButton
          ref={triggerRef}
          onClick={(event) => {
            if (!isOpen && !pillRef?.current?.contains(event?.target as Node)) {
              setIsOpen(true)
            }
          }}
        >
          <Copy as="span" scale={{ "@initial": 9, "@lg": 8 }} color="neutrals-8" bold>
            {label}
          </Copy>

          {amount ? (
            <Pill
              as="span"
              ref={pillRef}
              suffix={<IconCross onClick={() => resetFilterField(name)} />}
              size="small"
              data-testid="status-filter"
            >
              {amount} {isLargeAndAbove ? "selected" : ""}
            </Pill>
          ) : null}

          <IconChevronDown size="xs" />
        </SStatusFilterButton>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        css={{ width: 360, padding: 0, border: "none", borderRadius: 0 }}
        alignOffset={-1}
        onInteractOutside={(event) => {
          // if (isClearButtonClick) {
          //   if (event.detail.originalEvent.isTrusted) {
          //     handleClearButton()
          //   }
          //   return
          // }
          if (isTriggerClick(event)) {
            return
          }
          return setIsOpen(false)
        }}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
