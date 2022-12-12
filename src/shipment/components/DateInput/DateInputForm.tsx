import { Grid } from "@/shared/components"
import { CalendarDates } from "./CalendarDates"
import { SDatesInputContent } from "./DateInputForm.styles"

interface IDateInputFormProps {}

export const DateInputForm: React.FC<IDateInputFormProps> = () => {
  return (
    <Grid rows="1fr" css={{ height: "100%" }}>
      <SDatesInputContent>
        <CalendarDates />
      </SDatesInputContent>
    </Grid>
  )
}
