import { ComponentProps } from "@/utils"
import { Copy } from "@/shared/components"

export type IErrorLabelProps = ComponentProps<typeof Copy>

export const ErrorLabel = ({ children, id, ...props }: IErrorLabelProps) => {
  return (
    <Copy
      {...props}
      as="label"
      color="special-error-text"
      id={`${id}__error`}
      scale={8}
      role="alert"
    >
      {children}
    </Copy>
  )
}
