import React, { InputHTMLAttributes } from "react"
import { FormComponentProps } from "@/utils/types"
import { Copy, Flex } from "@/shared/components"

import { SRateRadioInputLabel, SRateRadioInputBox, SRateRadioInput } from "./RateRadioInput.styles"

export interface IRateRadioInputProps
  extends FormComponentProps<typeof SRateRadioInput, InputHTMLAttributes<HTMLInputElement>> {
  rateType: string
  rateName: string
  price: string
  currency: string
}

export const RateRadioInput = React.forwardRef<HTMLInputElement, IRateRadioInputProps>(
  ({ id, disabled, rateType, rateName, price, currency, ...props }, ref) => {
    const labelProps = React.useMemo(() => {
      return {
        disabled: disabled,
        htmlFor: id,
      }
    }, [disabled, id])

    const radioInputProps = React.useMemo(() => {
      return {
        id: id,
        disabled: disabled,
        ...props,
      }
    }, [id, disabled, props])

    return (
      <SRateRadioInputLabel data-ui="radiobutton" {...labelProps}>
        <SRateRadioInput ref={ref} data-ui="radiobutton__input" {...radioInputProps} type="radio" />
        <SRateRadioInputBox direction="column">
          <Copy scale={8} color="system-black" bold>
            {rateType}
          </Copy>
          <Flex align="center" justify="between">
            <Copy scale={10}>{rateName}</Copy>
            <Copy scale={8} color="system-black" bold>
              {currency} {price}
            </Copy>
          </Flex>
        </SRateRadioInputBox>
      </SRateRadioInputLabel>
    )
  },
)

RateRadioInput.displayName = "RateRadioInput"
