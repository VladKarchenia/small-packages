import React, { InputHTMLAttributes } from "react"

import { FormComponentProps } from "@/stitches/types"
import { ICost } from "@/shared/types"

import { Copy, Flex, IconTooltip, Spacer, Stack } from "@/shared/components"
import { IconInfoCircle } from "@/shared/icons"

import { SRateRadioInputLabel, SRateRadioInputBox, SRateRadioInput } from "./RateRadioInput.styles"

const costs: ICost[] = [
  {
    name: "Base rate",
    value: 1300,
  },
  {
    name: "Fuel",
    value: 140,
  },
  {
    name: "Accessorial",
    value: 0,
  },
  {
    name: "Other",
    value: 40,
  },
  {
    name: "Service",
    value: 10,
  },
  {
    name: "Tax",
    value: 50,
  },
]

export interface IRateRadioInputProps
  extends FormComponentProps<typeof SRateRadioInput, InputHTMLAttributes<HTMLInputElement>> {
  rateType: string
  rateName: string
  price: number
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
        <SRateRadioInput ref={ref} data-ui="radiobutton-input" {...radioInputProps} type="radio" />
        <SRateRadioInputBox direction="column">
          <Copy scale={8} color="system-black" bold>
            {rateType}
          </Copy>
          <Flex align="center" justify="between">
            <Copy scale={10}>{rateName}</Copy>
            <Flex align="center">
              <Copy scale={8} color="system-black" bold>
                {currency} {price.toFixed(2)}
              </Copy>
              <Spacer size={8} horizontal />
              <IconTooltip
                tooltip={
                  <Stack space={16} dividers>
                    <Stack space={0}>
                      <Copy scale={10}>Cost</Copy>
                      <Copy scale={8} color="system-black" bold>
                        {currency} {price.toFixed(2)}
                      </Copy>
                    </Stack>
                    <Stack space={8}>
                      {costs.map((cost) => {
                        return (
                          <Flex justify="between" key={cost.name}>
                            <Copy scale={9} color="neutrals-7">
                              {cost.name}
                            </Copy>
                            <Copy scale={9} color="system-black">
                              ${cost.value.toFixed(2)}
                            </Copy>
                          </Flex>
                        )
                      })}
                    </Stack>
                  </Stack>
                }
                ariaLabel="Cost breakdown tooltip"
                withArrow={false}
                withTitle={false}
                contentWidth={260}
                trigger={["hover", "focus"]}
                delayShow={150}
                delayHide={150}
                contentCss={{
                  padding: "$16",
                  border: "1px solid $neutrals-4",
                }}
                triggerCss={{
                  "& > span": {
                    borderRadius: "$rounded",
                  },
                }}
                icon={<IconInfoCircle />}
              />
            </Flex>
          </Flex>
        </SRateRadioInputBox>
      </SRateRadioInputLabel>
    )
  },
)

RateRadioInput.displayName = "RateRadioInput"
