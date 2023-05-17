import React, { InputHTMLAttributes } from "react"

import { CSS } from "@/stitches/config"
import { FormComponentProps } from "@/stitches/types"
import { enterKeyDown } from "@/shared/utils"

import { Copy, Spacer } from "@/shared/components"

import {
  SFormRadioInputLabel,
  SFormRadioInputBox,
  SFormRadioInputCircle,
  SFormRadioInput,
} from "./FormRadioInput.styles"

export interface IFormRadioInputProps
  extends FormComponentProps<typeof SFormRadioInput, InputHTMLAttributes<HTMLInputElement>> {
  label: React.ReactNode

  /**
   * ! Every field should always contain a label, so whenever this prop is used, make sure to add a label for the field manually
   */
  noLabel?: boolean
  view?: "circle"
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
      <SFormRadioInputLabel
        data-ui="radiobutton"
        onKeyDown={(e) => {
          enterKeyDown(e.key) && e.preventDefault()
        }}
        {...labelProps}
        css={labelCss}
      >
        <SFormRadioInput ref={ref} data-ui="radiobutton-input" {...radioInputProps} type="radio" />
        <SFormRadioInputBox data-ui="radiobutton-box">
          <SFormRadioInputCircle />
        </SFormRadioInputBox>
        {!noLabel && (
          <>
            <Spacer size={12} horizontal />
            <Copy color={disabled ? "theme-n5-n7" : "theme-b-n3"}>{label}</Copy>
          </>
        )}
      </SFormRadioInputLabel>
    )
  },
)

FormRadioInput.displayName = "FormRadioInput"
