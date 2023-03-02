import { useCallback, useRef } from "react"

import { Box, ComboboxContextValue, ComboboxInput, FormInput } from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { SCombobox, SComboboxMenu, SComboboxClearButton } from "./MobileCombobox.styles"

interface IMobileComboboxProps {
  comboboxProps: ComboboxContextValue
  id: string
  label: string
  placeholder?: string
  inputValue: string
  prefix?: React.ReactNode
  clearDestinationFn?: () => void
}

export const MobileCombobox: React.FC<React.PropsWithChildren<IMobileComboboxProps>> = ({
  children,
  comboboxProps,
  id,
  label,
  placeholder,
  inputValue,
  prefix,
  clearDestinationFn,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const clearDestination = useCallback(() => {
    comboboxProps.selectItem(null)
    inputRef.current?.focus()
    clearDestinationFn && clearDestinationFn()
  }, [comboboxProps, clearDestinationFn])

  return (
    <SCombobox {...comboboxProps}>
      <Box css={{ paddingX: "$16" }}>
        <ComboboxInput ref={inputRef}>
          <FormInput
            id={id}
            label={label}
            placeholder={placeholder}
            labelProps={{ hidden: true }}
            autoCorrect="off"
            autoComplete="off"
            prefix={prefix}
            suffix={
              inputValue && (
                <SComboboxClearButton
                  type="button"
                  aria-label="Clear button"
                  onClick={clearDestination}
                >
                  <IconCross />
                </SComboboxClearButton>
              )
            }
          />
        </ComboboxInput>
      </Box>
      <SComboboxMenu>{children}</SComboboxMenu>
    </SCombobox>
  )
}
