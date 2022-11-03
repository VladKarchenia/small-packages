import { Button, Copy, Grid, Link } from "@/shared/components"
import { useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { IStepperFormValues } from "../StepperContainer"
import { CalendarDates } from "./CalendarDates"
import { SDatesInputContent, SFooterWrap } from "./DateInputForm.styles"

export interface DateInputFormProps {
  initialValue: Date
  onSelect: (date: Date) => void
  onConfirm: () => void
  isDesktop?: boolean
}

export const DateInputForm: React.FC<DateInputFormProps> = ({
  initialValue,
  onSelect,
  onConfirm,
  isDesktop,
}) => {
  const { resetField } = useFormContext<IStepperFormValues>()
  const [dateValue, setDateValue] = useState(initialValue)
  console.log(dateValue)

  const handleChange = (value: Date) => {
    setDateValue(value)
  }

  const handleConfirm = () => {
    onSelect(dateValue)
    onConfirm()
  }

  const handleReset = () => {
    resetField("date")
    // setDateValue(initialValue || "")
    setDateValue(new Date())
  }

  return (
    // <FormProvider {...methods}>
    <Grid
      // as="form"
      rows="1fr max-content"
      css={{ height: "100%" }}
      // onSubmit={(e) => {
      //   e.stopPropagation()

      //   methods.handleSubmit(onSubmit)(e)
      // }}
    >
      <DatesInputContent isDesktop={isDesktop} date={dateValue} handleChange={handleChange} />
      <DatesInputFooter date={dateValue} onConfirm={handleConfirm} onReset={handleReset} />
    </Grid>
    // </FormProvider>
  )
}

const DatesInputContent = ({
  isDesktop,
  date,
  handleChange,
}: {
  isDesktop?: boolean
  date: Date
  handleChange: (value: Date) => void
}) => {
  return (
    <SDatesInputContent>
      <CalendarDates isDesktop={isDesktop} date={date} handleChange={handleChange} />
    </SDatesInputContent>
  )
}

const DatesInputFooter = ({
  date,
  onConfirm,
  onReset,
}: {
  date: Date
  onConfirm: () => void
  onReset: () => void
}) => {
  const { t } = useTranslation()

  const hasDate = useMemo(() => !!date, [date])

  if (!hasDate) return null

  return (
    <SFooterWrap align="center" justify="end">
      {/* <Link as="button" type="button" intent="detail" onClick={onReset}>
        <Copy scale={8} color="system-black" bold>
          Clear date
        </Copy>
      </Link> */}
      <Button
        css={{ paddingX: "$48" }}
        disabled={!hasDate}
        dataTestid="apply-date"
        color="black"
        onClick={onConfirm}
      >
        <Copy scale={8} color="system-white" bold>
          Done
        </Copy>
      </Button>
    </SFooterWrap>
  )
}
