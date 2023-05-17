import { useRef, useState } from "react"
import format from "date-fns/format"

import {
  Hidden,
  Popover,
  PopoverAnchor,
  PopoverContent,
  SearchFilterDrawer,
  SearchFilterDrawerPreview,
} from "@/shared/components"
import { IconCalendar, IconChevronLeft } from "@/shared/icons"

import { TimeInputForm } from "./TimeInputForm"

interface ITimeInputProps {
  time: Date | null
}

export const TimeInput: React.FC<ITimeInputProps> = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)

  return (
    <>
      <Hidden above="sm">
        <SearchFilterDrawer
          drawerName="timeInput"
          value={time ? `${format(time, "hh:mm aa")} ` : ""}
          placeholder="Select time"
          hidePlaceholder
          closeIcon={<IconChevronLeft />}
          suffix={<IconCalendar />}
          drawerForm={<TimeInputForm />}
          contentCss={{
            height: "100%",
          }}
          dataTestid="date-button-filter"
        />
      </Hidden>

      <Hidden below="sm">
        <Popover open={isOpen}>
          <PopoverAnchor asChild>
            <SearchFilterDrawerPreview
              ref={triggerRef}
              value={time ? `${format(time, "hh:mm aa")} ` : ""}
              suffix={<IconCalendar />}
              placeholder="Select time"
              hidePlaceholder
              close={() => setIsOpen(false)}
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
              dataTestid="date-button-filter"
            />
          </PopoverAnchor>
          <PopoverContent
            close={() => setIsOpen(false)}
            align="start"
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
            <TimeInputForm />
          </PopoverContent>
        </Popover>
      </Hidden>
    </>
  )
}
