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
import { IconArrowLeft, IconCalendar } from "@/shared/icons"
import { DateInputForm } from "./DateInputForm"

interface IDateInputProps {
  date: Date
}

export const DateInput: React.FC<IDateInputProps> = ({ date }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<any>()
  const isTriggerClick = (e: Event) => e.composedPath().includes(triggerRef.current)

  return (
    <>
      <Hidden above="sm">
        <SearchFilterDrawer
          drawerName="dateInput"
          drawerTitle="Date and Time"
          value={date ? format(date, "MMM d, yyyy hh:mm aa") : ""}
          placeholder={"Select date and time"}
          hidePlaceholder
          closeIcon={<IconArrowLeft />}
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
              value={date ? format(date, "MMM d, yyyy hh:mm aa") : ""}
              suffix={<IconCalendar />}
              placeholder={"Select date and time"}
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
            css={{ padding: "$0", border: "none", borderRadius: "$8", zIndex: "$2" }}
            alignOffset={-1}
            onInteractOutside={(e: any) => {
              if (isTriggerClick(e)) {
                return
              }

              return setIsOpen(false)
            }}
            onOpenAutoFocus={(e: any) => {
              e.preventDefault()
            }}
          >
            <DateInputForm />
          </PopoverContent>
        </Popover>
      </Hidden>
    </>
  )
}
