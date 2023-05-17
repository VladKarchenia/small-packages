import { useCallback, useRef } from "react"

import {
  Box,
  ButtonIcon,
  ComboboxContextValue,
  ComboboxInput,
  FormInput,
} from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { SCombobox, SComboboxMenu } from "./MobileCombobox.styles"

interface IMobileComboboxProps {
  comboboxProps: ComboboxContextValue
  id: string
  label: string
  placeholder?: string
  inputValue: string
  prefix?: React.ReactNode
  clearValueFn?: () => void
}

export const MobileCombobox: React.FC<React.PropsWithChildren<IMobileComboboxProps>> = ({
  children,
  comboboxProps,
  id,
  label,
  placeholder,
  inputValue,
  prefix,
  clearValueFn,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const clearValue = useCallback(() => {
    comboboxProps.selectItem(null)
    inputRef.current?.focus()
    clearValueFn && clearValueFn()
  }, [comboboxProps, clearValueFn])

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
                <ButtonIcon
                  icon={<IconCross />}
                  ariaLabel="Clear button"
                  onClick={clearValue}
                  inputIcon
                />
              )
            }
          />
        </ComboboxInput>
      </Box>
      <SComboboxMenu>{children}</SComboboxMenu>
    </SCombobox>
  )
}
