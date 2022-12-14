import React from "react"
import { ComponentProps } from "@/utils"
import { Copy, HiddenVisually } from "@/shared/components"

import { SFormLabel } from "./FormLabel.styles"

export interface IFormLabelProps extends ComponentProps<typeof SFormLabel> {
  hidden?: boolean
  required?: boolean
}

export const FormLabel = ({ children, hidden, ...props }: IFormLabelProps) => {
  const WrappingComponent = hidden ? HiddenVisually : React.Fragment

  return (
    <WrappingComponent>
      <SFormLabel {...props}>
        <Copy color="neutrals-9" scale={9} bold>
          {children}
        </Copy>
      </SFormLabel>
    </WrappingComponent>
  )
}
