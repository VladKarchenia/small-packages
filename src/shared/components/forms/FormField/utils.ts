import { IFormFieldCommonProps, IFormFieldProps } from "./FormField"

export const getFormFieldProps = ({
  id,
  label,
  postLabel,
  description,
  error,
  hasError,
  labelProps,
  borderless,
  prefix,
  suffix,
}: IFormFieldCommonProps & Pick<IFormFieldProps, "id">): IFormFieldCommonProps => {
  return {
    label,
    postLabel,
    description,

    error,
    hasError,

    labelProps: {
      ...labelProps,
      htmlFor: id,
    },

    borderless,

    prefix,
    suffix,
  }
}
