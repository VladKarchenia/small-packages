import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Copy, FormRadioGroup, RateRadioInput, GridContainer, Stack } from "@/shared/components"
import { ShippingType } from "@/shipment"
import { ShipmentState } from "@/shared/state"

const rates = [
  {
    rateType: "UPS",
    name: "Express Delivery",
    price: "430.00",
    currency: "$",
    id: "23",
  },
  {
    rateType: "UPS",
    name: "Economy Delivery",
    price: "200.00",
    currency: "$",
    id: "24",
  },
]

export const DeliveryRates = ({ shippingType }: { shippingType: ShippingType }) => {
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { rate } = watch()

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
        <Copy scale={9}>
          Rates shown here may be different than the actual charges for your shipment
        </Copy>
        <FormRadioGroup
          value={checkedOption}
          onChange={handleChange}
          id="rates-radio-id"
          name="rates-radio-group"
          // disabled={shippingType === ShippingType.Quote}
        >
          {rates.map((rate) => (
            <RateRadioInput
              key={rate.id}
              value={rate.id}
              rateType={rate.rateType}
              rateName={rate.name}
              price={rate.price}
              currency={rate.currency}
              disabled={shippingType === ShippingType.Quote}
            />
          ))}
        </FormRadioGroup>
        );
      </Stack>
    </GridContainer>
  )
}
