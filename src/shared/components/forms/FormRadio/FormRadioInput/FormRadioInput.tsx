import React, { InputHTMLAttributes } from "react"

import { CSS } from "@/stitches/config"
import { FormComponentProps } from "@/stitches/types"

import { Copy, Spacer } from "@/shared/components"
import { IconTick } from "@/shared/icons"

import {
  SFormRadioInputLabel,
  SFormRadioInputBox,
  SFormRadioTickInputBox,
  SFormRadioInputCircle,
  SFormRadioInput,
  SFormRadioTickCopyBox,
} from "./FormRadioInput.styles"

export interface IFormRadioInputProps
  extends FormComponentProps<typeof SFormRadioInput, InputHTMLAttributes<HTMLInputElement>> {
  label: React.ReactNode

  /**
   * ! Every field should always contain a label, so whenever this prop is used, make sure to add a label for the field manually
   */
  noLabel?: boolean
  view?: "circle" | "tick"
  labelCss?: CSS
}

export const FormRadioInput = React.forwardRef<HTMLInputElement, IFormRadioInputProps>(
  ({ id, disabled, label, noLabel, view = "circle", labelCss, ...props }, ref) => {
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
        view: view,
        ...props,
      }
    }, [id, disabled, view, props])

    return (
      <SFormRadioInputLabel data-ui="radiobutton" {...labelProps} css={labelCss}>
        <SFormRadioInput ref={ref} data-ui="radiobutton-input" {...radioInputProps} type="radio" />
        {view === "tick" ? (
          <SFormRadioTickCopyBox>
            <Copy scale={8} color="neutrals-9">
              {label}
            </Copy>
            <Spacer size={16} horizontal />
            <SFormRadioTickInputBox data-ui="radiobutton-tick-box">
              <IconTick />
            </SFormRadioTickInputBox>
          </SFormRadioTickCopyBox>
        ) : (
          <>
            <SFormRadioInputBox data-ui="radiobutton-box">
              <SFormRadioInputCircle />
            </SFormRadioInputBox>
            {!noLabel && (
              <>
                <Spacer size={16} horizontal />
                <Copy scale={8} color="neutrals-9">
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
