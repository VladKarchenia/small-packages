import React, { InputHTMLAttributes } from "react"

import { FormComponentProps } from "@/stitches/types"
import { enterKeyDown } from "@/shared/utils"

import { Copy, Spacer, ErrorLabel } from "@/shared/components"

import {
  SFormCheckboxBox,
  SFormCheckboxInput,
  SFormCheckboxLabel,
  SFormCheckboxTick,
  SFormCheckboxHyphen,
} from "./FormCheckbox.styles"

export interface IFormCheckboxProps
  extends FormComponentProps<typeof SFormCheckboxInput, InputHTMLAttributes<HTMLInputElement>> {
  label: React.ReactNode

  error?: React.ReactNode

  /**
   * ! Every field should always contain a label, so whenever this prop is used, make sure to add a label for the field manually
   */
  noLabel?: boolean

  iconType?: "tick" | "hyphen"
}

export const FormCheckbox = React.forwardRef(
  (
    { checked, noLabel, iconType = "tick", error, ...props }: IFormCheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
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
        <SFormCheckboxLabel
          data-ui="form-checkbox"
          onKeyDown={(e) => {
            enterKeyDown(e.key) && e.preventDefault()
          }}
          {...labelProps}
        >
          <SFormCheckboxInput data-ui="form-checkbox-input" {...checkboxInputProps} />
          <SFormCheckboxBox data-ui="form-checkbox-box">
            {iconType === "tick" ? <SFormCheckboxTick /> : <SFormCheckboxHyphen />}
          </SFormCheckboxBox>
          {!noLabel && (
            <>
              <Spacer size={12} horizontal />
              <Copy color={disabled ? "theme-n5-n7" : "theme-b-n3"} data-ui="form-checkbox-copy">
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
