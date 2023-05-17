import { Grid } from "@/shared/components"

import { CalendarTimes } from "./CalendarTimes"

import { STimeInputContent } from "./TimeInputForm.styles"

interface ITimeInputFormProps {}

export const TimeInputForm: React.FC<ITimeInputFormProps> = () => {
  return (
    <Grid rows="1fr" css={{ height: "100%" }}>
      <STimeInputContent>
        <CalendarTimes />
      </STimeInputContent>
    </Grid>
  )
}
