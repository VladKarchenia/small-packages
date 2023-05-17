import { useRef, useState } from "react"

import { DashboardState, useDashboardActionContext } from "@/dashboard/state"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { escapeKeyDown, spaceAndEnterKeyDown } from "@/shared/utils"

import { Copy, Pill, Popover, PopoverAnchor, PopoverContent } from "@/shared/components"
import { IconChevronDown, IconChevronTop, IconCross } from "@/shared/icons"

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
      <PopoverAnchor
        asChild
        onKeyDown={(e: { key: string }) => escapeKeyDown(e.key) && setIsOpen(false)}
      >
        <SStatusFilterButton
          ref={triggerRef}
          onClick={(event) => {
            if (!isOpen && !pillRef?.current?.contains(event?.target as Node)) {
              setIsOpen(true)
            }
          }}
          active={isOpen}
        >
          <Copy as="span" fontWeight="semiBold">
            {label}
          </Copy>

          {amount ? (
            <Pill
              as="span"
              ref={pillRef}
              suffix={<IconCross onClick={() => resetFilterField(name)} />}
              size="small"
              tabIndex={0}
              onKeyDown={(e: { key: string }) =>
                spaceAndEnterKeyDown(e.key) && resetFilterField(name)
              }
              data-testid="status-filter"
            >
              {amount} {isLargeAndAbove ? "selected" : ""}
            </Pill>
          ) : null}

          {isOpen ? <IconChevronTop size="xs" /> : <IconChevronDown size="xs" />}
        </SStatusFilterButton>
      </PopoverAnchor>
      <PopoverContent
        close={() => setIsOpen(false)}
        align="start"
        css={{
          width: 360,
          keyboardFocus: {
            outline: "1px solid $theme-vl-n3",
          },
        }}
        alignOffset={-1}
        onInteractOutside={(event) => {
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
