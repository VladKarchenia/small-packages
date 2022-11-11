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
  date: Date | null
  handleChange: (value: Date | null) => void
}) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(date)
  const today = new Date()
  const end = addDays(today, 13)

  const handleSelect = (value?: Date) => {
    if (value) {
      setSelectedDay(value)
      handleChange(value)
    }
  }
  return (
    <DayPicker
      mode="single"
      selected={selectedDay || undefined}
      onSelect={(day) => handleSelect(day)}
      disabled={{ before: today, after: end }}
    />
  )
}
