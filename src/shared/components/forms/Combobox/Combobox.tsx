import React from "react"
import { UseComboboxReturnValue } from "downshift"

import { createContext } from "@/utils"

export type ComboboxItemFormat = {
  value: string
  label: string
}

type ComboboxContextValue = UseComboboxReturnValue<ComboboxItemFormat> & {}

type ComboboxProps = UseComboboxReturnValue<ComboboxItemFormat> & {
  className?: string
  children: React.ReactNode
}

export const [ComboboxProvider, useComboboxContext] =
  createContext<ComboboxContextValue>("Combobox")

export const Combobox = ({ className, children, ...props }: ComboboxProps) => {
  return (
    <ComboboxProvider {...props}>
      <div className={className} {...props}>
        {children}
      </div>
    </ComboboxProvider>
  )
}
