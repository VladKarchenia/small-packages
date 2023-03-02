import { useRef, useState } from "react"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { IPerson } from "@/shared/types"

import {
  Hidden,
  Popover,
  PopoverAnchor,
  PopoverContent,
  SearchFilterDrawer,
  SearchFilterDrawerPreview,
} from "@/shared/components"
import { IconCalendar, IconChevronLeft } from "@/shared/icons"

import { DateInputForm } from "./DateInputForm"

interface IDateInputProps {
  date: Date
  sender: IPerson
}

export const DateInput: React.FC<IDateInputProps> = ({ date, sender }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isTriggerClick = (event: Event) =>
    event.composedPath().includes(triggerRef.current as EventTarget)

  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )

  return (
    <>
      <Hidden above="sm">
        <SearchFilterDrawer
          drawerName="dateInput"
          drawerTitle="Date and Time"
          value={
            date
              ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                  date,
                  timeZone,
                  "(zzz)",
                )}`
              : ""
          }
          placeholder="Select date and time"
          hidePlaceholder
          closeIcon={<IconChevronLeft />}
          suffix={<IconCalendar />}
          drawerForm={<DateInputForm />}
          dataTestid="date-button-filter"
        />
      </Hidden>

      <Hidden below="sm">
        <Popover open={isOpen}>
          <PopoverAnchor asChild>
            <SearchFilterDrawerPreview
              ref={triggerRef}
              value={
                date
                  ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                      date,
                      timeZone,
                      "(zzz)",
                    )}`
                  : ""
              }
              suffix={<IconCalendar />}
              placeholder="Select date and time"
              hidePlaceholder
              dataTestid="date-button-filter"
              css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
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
            />
          </PopoverAnchor>
          <PopoverContent
            align="start"
            css={{ padding: 0, border: "none", borderRadius: "$8", zIndex: "$2" }}
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
            <DateInputForm />
          </PopoverContent>
        </Popover>
      </Hidden>
    </>
  )
}
