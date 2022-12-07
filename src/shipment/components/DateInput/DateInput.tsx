import format from "date-fns/format"
import { SearchFilterDrawer } from "@/shared/components"
import { IconArrowLeft, IconCalendar } from "@/shared/icons"
import { DateInputForm } from "./DateInputForm"

interface IDateInputProps {
  date: Date | null
}

export const DateInput: React.FC<IDateInputProps> = ({ date }) => {
  return (
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
  )
}
