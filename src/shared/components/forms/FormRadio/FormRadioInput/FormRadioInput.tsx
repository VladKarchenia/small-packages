import React, { InputHTMLAttributes } from "react"
import { FormComponentProps } from "@/utils/types"
import { Copy, Spacer } from "@/shared/components"

import {
  SFormRadioInputLabel,
  SFormRadioInputBox,
  SFormRadioTickInputBox,
  SFormRadioInputCircle,
  SFormRadioInput,
  SFormRadioTickCopyBox,
} from "./FormRadioInput.styles"
import { IconTick } from "@/shared/icons"

export interface IFormRadioInputProps
  extends FormComponentProps<typeof SFormRadioInput, InputHTMLAttributes<HTMLInputElement>> {
  label: React.ReactNode

  /**
   * ! Every field should always contain a label, so whenever this prop is used, make sure to add a label for the field manually
   */
  noLabel?: boolean
  iconType?: "circle" | "tick"
}

export const FormRadioInput = React.forwardRef<HTMLInputElement, IFormRadioInputProps>(
  ({ id, disabled, label, noLabel, iconType = "circle", ...props }, ref) => {
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
        iconType: iconType,
        ...props,
      }
    }, [id, disabled, iconType, props])

    return (
      <SFormRadioInputLabel data-ui="radiobutton" {...labelProps}>
        <SFormRadioInput ref={ref} data-ui="radiobutton__input" {...radioInputProps} type="radio" />
        {iconType === "tick" ? (
          <SFormRadioTickCopyBox>
            <Copy color="neutrals-9" intent="detail">
              {label}
            </Copy>
            <Spacer size={16} horizontal />
            <SFormRadioTickInputBox data-ui="radiobutton__box">
              <IconTick />
            </SFormRadioTickInputBox>
          </SFormRadioTickCopyBox>
        ) : (
          <>
            <SFormRadioInputBox data-ui="radiobutton__box">
              <SFormRadioInputCircle />
            </SFormRadioInputBox>
            {!noLabel && (
              <>
                <Spacer size={16} horizontal />
                <Copy color="neutrals-9" intent="detail">
                  {label}
                </Copy>
              </>
            )}
          </>
        )}
      </SFormRadioInputLabel>
    )
  },
)

FormRadioInput.displayName = "FormRadioInput"
