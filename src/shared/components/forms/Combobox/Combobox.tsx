import React from "react"
import { UseComboboxReturnValue } from "downshift"
import { createContext } from "@/utils"

type ComboboxContextValue = UseComboboxReturnValue<any> & {}

type ComboboxProps = UseComboboxReturnValue<any> & {
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
