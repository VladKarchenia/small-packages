import { useState } from "react"
import { Drawer, useDrawer, useDrawerActions } from "@/shared/components"
import { IconArrowLeft, IconCalendar } from "@/shared/icons"
import { InputPreview } from "../InputPreview"
import { DateInputForm } from "./DateInputForm"
import format from "date-fns/format"

export interface DateInputProps {
  initialValue: Date | null
  onChange: (value: Date | null) => void
}

export const DateInput: React.FC<DateInputProps> = ({ initialValue, onChange }) => {
  const [drawerProps] = useDrawer("dateInput")
  const { close } = useDrawerActions()

  const [date, setDate] = useState<Date | null>(initialValue)

  const handleChange = (date: Date | null) => {
    onChange(date)
    setDate(date)
  }

  return (
    <Drawer
      {...drawerProps}
      closeIcon={<IconArrowLeft />}
      fullWidth={{ "@max-sm": true }}
      noPadding
      trigger={
        <InputPreview
          figure={<IconCalendar />}
          value={date ? format(date, "dd.MM.yyyy") : ""}
          placeholder={"XX. YY. ZZ 00:00 PM"}
          isPlaceholderShown={false}
          dataTestid="date-button-filter"
          // TODO: remove when using popovers on desktop, this is a temp fix until we remove this from the Desktop experience
          css={{ cursor: "pointer", hover: { backgroundColor: "$neutrals-1" } }}
        />
      }
    >
      <DateInputForm
        initialValue={date}
        onSelect={handleChange}
        onConfirm={() => close("dateInput")}
      />
    </Drawer>
  )
}
