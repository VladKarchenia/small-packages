import { forwardRef } from "react"
import Select, { components } from "react-select"

import { boxShadows } from "@/stitches/utils"
import { enterKeyDown } from "@/shared/utils"

import {
  Box,
  Copy,
  ErrorLabel,
  Flex,
  FormLabel,
  IFormLabelProps,
  Spacer,
} from "@/shared/components"
import { IconChevronDown, IconTick } from "@/shared/icons"

interface ISelectProps {
  value: unknown
  onValueChange: (value: unknown) => void
  options: unknown[]
  label: string
  labelProps?: IFormLabelProps
  description?: string
  name: string
  disabled?: boolean
  borderless?: boolean
  error?: string
}

const { Option } = components

export const FormSelect = forwardRef<HTMLDivElement, ISelectProps>(
  (
    {
      label,
      labelProps,
      description,
      value,
      onValueChange,
      options,
      disabled,
      borderless,
      error,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forwardedRef,
  ) => {
    return (
      <Box>
        <Flex justify="between" css={{ position: "relative" }}>
          <FormLabel {...labelProps}>{label}</FormLabel>

          {description && (
            <Copy scale={10} color="neutrals-5" fontWeight="semiBold">
              {description}
              {labelProps?.required ? (
                <Copy as="span" scale={10} fontWeight="semiBold" css={{ paddingLeft: "$2" }}>
                  *
                </Copy>
              ) : null}
            </Copy>
          )}
        </Flex>

        {(!labelProps?.hidden || description) && <Spacer size={4} />}

        <Select
          {...props}
          value={{ value: value, label: value }}
          onChange={(value) => onValueChange(value?.value)}
          options={options.map((i) => ({ value: i, label: i }))}
          isSearchable={false}
          isDisabled={disabled}
          onKeyDown={(e) => {
            enterKeyDown(e.key) && e.preventDefault()
          }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <IconChevronDown size="xs" />,
            Option: ({ children, isSelected, ...rest }) => {
              return (
                <Option isSelected={isSelected} {...rest}>
                  <Flex align="center" justify="between" css={{ gap: "$12" }}>
                    {children}
                    {isSelected ? <IconTick /> : null}
                  </Flex>
                </Option>
              )
            },
          }}
          styles={{
            control: (styles) => ({
              ...styles,
              justifyContent: !borderless ? "space-between" : "start",
              gap: "var(--space-8)",
              backgroundColor: disabled
                ? "var(--colors-theme-n1-n10)"
                : borderless
                ? "initial"
                : "var(--colors-theme-w-n9)",
              color: disabled ? "var(--colors-theme-n4-n7)" : "var(--colors-theme-b-n3)",
              border: "none",
              borderRadius: "var(--radii-0)",
              cursor: "pointer",
              boxShadow: !borderless
                ? error
                  ? boxShadows.input.error
                  : boxShadows.input.initial
                : "none",
              transition: "100ms ease-out",
              appearance: "none",
              WebkitAppearance: "none",
              outline: "none",

              "&:hover": {
                boxShadow: !borderless
                  ? error
                    ? boxShadows.input.error
                    : boxShadows.input.hover
                  : "none",
              },
              "&:focus, &:focus-within": {
                boxShadow: !borderless
                  ? error
                    ? boxShadows.input.error
                    : boxShadows.input.focus
                  : "none",
                color: !borderless ? "var(--colors-theme-b-n3)" : "var(--colors-theme-vl-yl)",
              },
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "var(--colors-system-inherit)",
            }),
            valueContainer: (styles) => ({
              ...styles,
              flex: !borderless ? 1 : "initial",
              padding: !borderless
                ? "var(--space-12) var(--space-0) var(--space-12) var(--space-16)"
                : "var(--space-12) var(--space-0)",
            }),
            indicatorsContainer: (styles) => ({
              ...styles,
              justifyContent: "center",
              width: !borderless ? "var(--space-48)" : "var(--space-24)",
            }),
            menu: (styles) => ({
              ...styles,
              margin: "var(--space-0)",
              backgroundColor: "transparent",
              borderRadius: "var(--radii-0)",
              zIndex: "var(--zIndices-2)",
              boxShadow: "none",
            }),
            menuList: (styles) => ({
              ...styles,
              margin: "var(--space-8) var(--space-0)",
              padding: "var(--space-0)",
              minWidth: 100,
              maxHeight: 290,
              boxShadow: boxShadows.dropdown,
            }),
            option: (styles, { isFocused }) => ({
              ...styles,
              padding: "var(--space-12) var(--space-16)",
              backgroundColor: isFocused ? "var(--colors-theme-n2-n7)" : "var(--colors-theme-w-n8)",
              color: "var(--colors-theme-b-n3)",
              cursor: "pointer",
              zIndex: "var(--zIndices-1)",
            }),
          }}
        />

        {error && (
          <Box css={{ position: "absolute" }}>
            <ErrorLabel id={label}>{error}</ErrorLabel>
          </Box>
        )}
      </Box>
    )
  },
)

FormSelect.displayName = "FormSelect"
