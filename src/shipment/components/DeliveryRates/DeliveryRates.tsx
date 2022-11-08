import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Copy, FormRadioGroup, RateRadioInput, GridContainer, Stack } from "@/shared/components"
import { IStepperFormValues, DateInput } from "@/shipment"

const rates = [
  {
    type: "UPS",
    name: "Express Delivery",
    price: "430.00",
    currency: "$",
    id: "23",
  },
  {
    type: "UPS",
    name: "Economy Delivery",
    price: "200.00",
    currency: "$",
    id: "24",
  },
]

export const DeliveryRates = () => {
  const { setValue, watch } = useFormContext<IStepperFormValues>()
  const { date, rate } = watch()

  const [checkedOption, setCheckedOption] = useState(rate.id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCheckedOption(e.target.value)

  // useEffect(() => {
  //   // TODO: need to refetch getRates request with new date
  //   // + need to add loading and error views
  // }, [date])

  useEffect(() => {
    const selectedRate = rates.find((i) => i.id === checkedOption)
    if (selectedRate) {
      setValue("rate", selectedRate)
    }
  }, [checkedOption, setValue])

  return (
    <GridContainer fullBleed>
      <Stack space={12}>
        <Copy scale={9}>Please, select a delivery date to calculate the cost</Copy>
        <DateInput
          initialValue={date}
          onChange={(value) => {
            setValue("date", value)
          }}
        />
        <FormRadioGroup
          value={checkedOption}
          onChange={handleChange}
          id="rates-radio-id"
          name="rates-radio-group"
        >
          {rates.map((rate) => (
            <RateRadioInput
              key={rate.id}
              value={rate.id}
              rateType={rate.type}
              rateName={rate.name}
              price={rate.price}
              currency={rate.currency}
            />
          ))}
        </FormRadioGroup>
        );
      </Stack>
    </GridContainer>
  )
}
