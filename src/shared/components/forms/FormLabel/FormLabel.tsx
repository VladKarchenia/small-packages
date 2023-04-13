import React from "react"

import { ComponentProps } from "@/stitches/types"

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
        <Copy scale={10} color="neutrals-5" fontWeight="semiBold">
          {children}
          {props?.required ? (
            <Copy as="span" scale={10} fontWeight="semiBold" css={{ paddingLeft: "$2" }}>
              *
            </Copy>
          ) : null}
        </Copy>
      </SFormLabel>
    </WrappingComponent>
  )
}
