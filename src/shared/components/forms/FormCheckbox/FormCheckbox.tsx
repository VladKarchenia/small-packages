import React, { InputHTMLAttributes } from "react"

import { FormComponentProps } from "@/stitches/types"

import { Copy, Spacer, ErrorLabel } from "@/shared/components"

import {
  SFormCheckboxBox,
  SFormCheckboxInput,
  SFormCheckboxLabel,
  SFormCheckboxTick,
} from "./FormCheckbox.styles"

export interface IFormCheckboxProps
  extends FormComponentProps<typeof SFormCheckboxInput, InputHTMLAttributes<HTMLInputElement>> {
  label: React.ReactNode

  error?: React.ReactNode

  /**
   * ! Every field should always contain a label, so whenever this prop is used, make sure to add a label for the field manually
   */
  noLabel?: boolean
}

export const FormCheckbox = React.forwardRef(
  ({ checked, noLabel, error, ...props }: IFormCheckboxProps, ref: React.Ref<HTMLInputElement>) => {
    const { label, disabled, id, ...inputProps } = props

    const labelProps = React.useMemo(() => {
      return {
        disabled: disabled,
        htmlFor: id,
      }
    }, [disabled, id])

    const checkboxInputProps = React.useMemo(() => {
      return {
        id: id,
        disabled: disabled,
        checked,
        ref: ref,
        type: "checkbox",
        ...inputProps,
      }
    }, [id, disabled, checked, ref, inputProps])

    return (
      <>
        <SFormCheckboxLabel data-ui="form-checkbox" {...labelProps}>
          <SFormCheckboxInput data-ui="form-checkbox-input" {...checkboxInputProps} />
          <SFormCheckboxBox data-ui="form-checkbox-box">
            <SFormCheckboxTick />
          </SFormCheckboxBox>
          {!noLabel && (
            <>
              <Spacer size={16} horizontal />
              <Copy scale={8} color="neutrals-9" data-ui="form-checkbox-copy">
                {label}
              </Copy>
            </>
          )}
        </SFormCheckboxLabel>

        {error && <ErrorLabel id={id}>{error}</ErrorLabel>}
      </>
    )
  },
)

FormCheckbox.displayName = "FormCheckbox"
