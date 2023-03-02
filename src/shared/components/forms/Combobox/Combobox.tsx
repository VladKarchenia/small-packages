import React from "react"
import { UseComboboxReturnValue } from "downshift"

import { createContext } from "@/shared/utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComboboxContextValue = UseComboboxReturnValue<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComboboxProps = UseComboboxReturnValue<any> & {
  children: React.ReactNode
}

export const [ComboboxProvider, useComboboxContext] =
  createContext<ComboboxContextValue>("Combobox")

export const Combobox = ({ children, ...props }: ComboboxProps) => {
  return <ComboboxProvider {...props}>{children}</ComboboxProvider>
}
