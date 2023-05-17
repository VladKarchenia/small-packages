import { useRef, useState } from "react"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { useBoundStore } from "@/store"
import { IPerson, ShippingType } from "@/shared/types"
import { INITIAL_READY_DATE_DEFAULT } from "@/constants"

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
  const shippingType = useBoundStore((state) => state.shippingType)
  const isDateExpired = date < new Date(INITIAL_READY_DATE_DEFAULT)
  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude) || 0,
    parseFloat(sender.fullAddress.longitude) || 0,
  )

  return (
    <>
      <Hidden above="sm">
        <SearchFilterDrawer
          drawerName="dateInput"
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
          contentCss={{
            height: "100%",
          }}
          error={
            // TODO: add a condition when it's a Shipment and a status is Draft
            shippingType === ShippingType.Quote && isDateExpired
              ? "Ready time min value not met"
              : null
          }
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
              error={
                // TODO: add a condition when it's a Shipment and a status is Draft
                shippingType === ShippingType.Quote && isDateExpired
                  ? "Ready time min value not met"
                  : null
              }
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
            <DateInputForm />
          </PopoverContent>
        </Popover>
      </Hidden>
    </>
  )
}
