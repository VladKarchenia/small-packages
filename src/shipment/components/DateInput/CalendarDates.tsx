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
    <DayPicker
      mode="single"
      selected={selectedDay}
      onSelect={(day) => handleSelect(day)}
      disabled={{ before: today, after: end }}
      modifiersClassNames={{
        selected: "my-selected",
      }}
    />
  )
}
