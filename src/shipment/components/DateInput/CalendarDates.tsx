import addDays from "date-fns/addDays"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

const css = `
  .my-selected:not([disabled]):not(.rdp-day_selected) { 
    border: 2px solid currentColor;
    background-color: black;
    color: white;
  }
  .my-selected:hover:not([disabled]):not(.rdp-day_selected) { 
    border-color: black;
    background-color: black;
    color: white;
  }
  @media screen and (max-width: 480px) {
     .rdp { --rdp-cell-size: 46px; }
   }
   @media screen and (min-width: 481px) {
     .rdp { --rdp-cell-size: 60px; }
   }
   @media screen and (min-width: 769px) {
     .rdp { --rdp-cell-size: 40px; }
   }
`;

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
    <>
      <style>{css}</style>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={(day) => handleSelect(day)}
        disabled={{ before: today, after: end }}
        modifiersClassNames={{
          selected: 'my-selected',
        }}
      />
    </>
  )
}
