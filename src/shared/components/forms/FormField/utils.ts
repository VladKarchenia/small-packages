import { IFormFieldCommonProps, IFormFieldProps } from "./FormField"

export const getFormFieldProps = ({
  id,
  label,
  postLabel,
  description,
  error,
  hasError,
  isFocused,
  labelProps,
  prefix,
  suffix,
}: IFormFieldCommonProps & Pick<IFormFieldProps, "id">): IFormFieldCommonProps => {
  return {
    label,
    postLabel,
    description,

    error,
    hasError,

    isFocused,

    labelProps: {
      ...labelProps,
      htmlFor: id,
    },

    prefix,
    suffix,
  }
}
