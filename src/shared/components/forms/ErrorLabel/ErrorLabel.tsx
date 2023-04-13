import { ComponentProps } from "@/stitches/types"

import { Copy } from "@/shared/components"

type IErrorLabelProps = ComponentProps<typeof Copy>

export const ErrorLabel = ({ children, id, ...props }: IErrorLabelProps) => {
  return (
    <Copy {...props} as="label" scale={10} color="special-error" id={`${id}__error`} role="alert">
      {children}
    </Copy>
  )
}
