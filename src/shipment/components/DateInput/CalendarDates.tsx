// import { Datepicker } from "@/shared/components"
import addDays from "date-fns/addDays"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export const CalendarDates = ({
  isDesktop,
  date,
  handleChange,
}: {
  isDesktop?: boolean
  date: Date
  handleChange: (value: Date) => void
}) => {
  const [selectedDay, setSelectedDay] = useState<Date>(date)
  const today = new Date()
  const end = addDays(today, 13)

  const handleSelect = (value?: Date) => {
    if (value) {
      setSelectedDay(value)
      handleChange(value)
    }
  }
  return (
    // <Datepicker
    //   direction={isDesktop ? "normal" : "vertical"}
    //   {...(isDesktop ? { numberOfMonths: 2 } : {})}
    //   isOpen
    //   value={date}
    //   clearHighlightedOnBlur
    //   onDateChange={(date: string) => {
    //     handleChange(date)
    //   }}
    // />
    <DayPicker
      mode="single"
      selected={selectedDay}
      onSelect={(day) => handleSelect(day)}
      disabled={{ before: today, after: end }}
    />
  )
}
