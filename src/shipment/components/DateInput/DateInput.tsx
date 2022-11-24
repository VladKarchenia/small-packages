import format from "date-fns/format"
import { SearchFilterDrawer } from "@/shared/components"
import { IconArrowLeft, IconCalendar } from "@/shared/icons"
import { DateInputForm } from "./DateInputForm"

export interface DateInputProps {
  date: Date | null
}

export const DateInput: React.FC<DateInputProps> = ({ date }) => {
  return (
    <SearchFilterDrawer
      drawerName="dateInput"
      drawerTitle="Date and Time"
      value={date ? format(date, "dd.MM.yyyy hh:mm aa") : ""}
      placeholder={"XX. YY. ZZ 00:00 AM"}
      hidePlaceholder
      closeIcon={<IconArrowLeft />}
      suffix={<IconCalendar />}
      drawerForm={<DateInputForm />}
      dataTestid="date-button-filter"
    />
  )
}
