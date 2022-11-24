import { Grid } from "@/shared/components"
import { CalendarDates } from "./CalendarDates"
import { SDatesInputContent } from "./DateInputForm.styles"

export interface DateInputFormProps {
  isDesktop?: boolean
}

export const DateInputForm: React.FC<DateInputFormProps> = ({ isDesktop }) => {
  return (
    <Grid rows="1fr" css={{ height: "100%" }}>
      <DatesInputContent isDesktop={isDesktop} />
    </Grid>
  )
}

const DatesInputContent = ({ isDesktop }: { isDesktop?: boolean }) => {
  return (
    <SDatesInputContent>
      <CalendarDates isDesktop={isDesktop} />
    </SDatesInputContent>
  )
}
