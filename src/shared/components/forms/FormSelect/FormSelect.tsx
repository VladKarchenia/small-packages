import React, { SelectHTMLAttributes } from "react"
import { ComponentProps, FormComponentProps } from "@/utils"
import { IconChevronDown } from "@/shared/icons"
import { FormField, getFormFieldProps, IFormFieldCommonProps } from "../FormField"
import { SFormSelect, SFormSelectOption, SFormSelectValue } from "./FormSelect.styles"

type IFormSelectOptionProps = ComponentProps<typeof SFormSelectOption>

export const FormSelectOption = (props: IFormSelectOptionProps) => {
  return <SFormSelectOption {...props} />
}

export interface IFormSelectProps
  extends IFormFieldCommonProps,
    FormComponentProps<typeof SFormSelectValue, SelectHTMLAttributes<HTMLSelectElement>> {
  displayValue?: string | React.ReactNode
}

export const FormSelect = React.forwardRef<HTMLSelectElement, IFormSelectProps>(
  (
    { children, placeholder, displayValue, labelProps, hasError, prefix, suffix, ...props },
    ref,
  ) => {
    const fieldProps = getFormFieldProps({ labelProps, hasError, prefix, suffix, ...props })
    const { value } = props
    const selectDisplayValue = displayValue || (placeholder && !value ? placeholder : value)

    return (
      <FormField {...fieldProps} suffix={<IconChevronDown size="xs" block />} id={props.id}>
        <>
          <SFormSelect ref={ref} data-ui="select" {...props}>
            {placeholder && !props.value && (
              <FormSelectOption disabled value="">
                {placeholder}
              </FormSelectOption>
            )}

            {children}
          </SFormSelect>

          <SFormSelectValue
            isPlaceholder={props.isPlaceholder}
            large={props.large}
            data-ui="select__value"
          >
            {selectDisplayValue}
          </SFormSelectValue>
        </>
      </FormField>
    )
  },
)

FormSelect.displayName = "FormSelect"
