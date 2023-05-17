import React, { InputHTMLAttributes } from "react"

import { FormComponentProps } from "@/stitches/types"
import { enterKeyDown } from "@/shared/utils"

import { FormField, IFormFieldCommonProps, getFormFieldProps } from "@/shared/components"

import { SFormInput } from "./FormInput.styles"

export interface IFormInputProps
  extends IFormFieldCommonProps,
    FormComponentProps<typeof SFormInput, InputHTMLAttributes<HTMLInputElement>> {}

export const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  ({ labelProps, postLabel, prefix, suffix, id, hasError, borderless, ...props }, ref) => {
    const fieldProps = getFormFieldProps({
      id,
      labelProps,
      postLabel,
      prefix,
      suffix,
      hasError,
      borderless,
      ...props,
    })

    return (
      <FormField id={id} {...fieldProps}>
        <SFormInput
          ref={ref}
          hasSuffix={!!suffix}
          hasPrefix={!!prefix}
          borderless={borderless}
          onKeyDown={(e: { key: string; preventDefault: () => void }) => {
            enterKeyDown(e.key) && e.preventDefault()
          }}
          {...props}
        />
      </FormField>
    )
  },
)

FormInput.displayName = "FormInput"
