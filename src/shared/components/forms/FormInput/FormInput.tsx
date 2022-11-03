import React, { InputHTMLAttributes } from "react"
import { FormComponentProps } from "@/utils"

import { FormField, IFormFieldCommonProps, getFormFieldProps } from "../FormField"
import { SFormInput } from "./FormInput.styles"

export interface IFormInputProps
  extends IFormFieldCommonProps,
    FormComponentProps<typeof SFormInput, InputHTMLAttributes<HTMLInputElement>> {}

export const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  ({ labelProps, prefix, suffix, id, ...props }, ref) => {
    const fieldProps = getFormFieldProps({ id, labelProps, prefix, suffix, ...props })

    return (
      <FormField id={id} {...fieldProps}>
        <SFormInput ref={ref} {...props} />
      </FormField>
    )
  },
)

FormInput.displayName = "FormInput"
