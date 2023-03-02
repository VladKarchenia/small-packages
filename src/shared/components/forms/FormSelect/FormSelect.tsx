import React from "react"
import Select, { components } from "react-select"

import { boxShadows, rgba } from "@/stitches/utils"

import { Copy, ErrorLabel, Flex, FormLabel, IFormLabelProps, Spacer } from "@/shared/components"
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

export const FormSelect = React.forwardRef<HTMLDivElement, ISelectProps>(
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
      <>
        <Flex justify="between">
          <FormLabel {...labelProps}>{label}</FormLabel>
        </Flex>

        {description && (
          <Copy scale={10}>
            {description}
            {labelProps?.required ? (
              <Copy as="span" scale={10} css={{ paddingLeft: "$2" }}>
                *
              </Copy>
            ) : null}
          </Copy>
        )}

        {(!labelProps?.hidden || description) && <Spacer size={8} />}

        <Select
          {...props}
          value={{ value: value, label: value }}
          onChange={(value) => onValueChange(value?.value)}
          options={options.map((i) => ({ value: i, label: i }))}
          isSearchable={false}
          isDisabled={disabled}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <IconChevronDown size="xs" />,
            Option: ({ children, isSelected, ...rest }) => (
              <Option isSelected={isSelected} {...rest}>
                <Flex align="center" justify="between" css={{ gap: "$12" }}>
                  {children}
                  {isSelected ? <IconTick /> : null}
                </Flex>
              </Option>
            ),
          }}
          styles={{
            control: (styles) => ({
              ...styles,
              justifyContent: !borderless ? "space-between" : "start",
              gap: "var(--space-8)",
              border: "none",
              borderRadius: "var(--radii-8)",
              appearance: "none",
              WebkitAppearance: "none",
              outline: "none",
              cursor: "pointer",
              boxShadow: !borderless ? boxShadows.input.initial : "none",
              transition: "100ms box-shadow ease-out",

              ":hover": {
                boxShadow: !borderless ? boxShadows.input.hover : "none",
              },
              ":focus-within": {
                boxShadow: !borderless ? boxShadows.input.focus : "none",
              },
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "var(--colors-system-black)",
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
              width: !borderless ? "var(--sizes-48)" : "var(--sizes-24)",
            }),
            menu: (styles) => ({
              ...styles,
              margin: "var(--space-0)",
              backgroundColor: "var(--colors-system-white)",
              zIndex: "var(--zIndices-2)",
              boxShadow: "none",
            }),
            menuList: (styles) => ({
              ...styles,
              margin: "var(--space-8) var(--space-0)",
              padding: "var(--space-0)",
              minWidth: 100,
              maxHeight: 290,
              borderRadius: "var(--radii-8)",
              border: "1px solid var(--colors-neutrals-3)",
              boxShadow: `0 var(--space-8) var(--space-24) 0 ${rgba("system-black", 0.08)}`,
            }),
            option: (styles) => ({
              ...styles,
              padding: "var(--space-12) var(--space-16)",
              backgroundColor: "var(--colors-system-white)",
              color: "var(--colors-system-black)",
              cursor: "pointer",
              zIndex: "var(--zIndices-1)",

              ":hover, :focus, :focus-within": {
                backgroundColor: "var(--colors-neutrals-3)",
              },

              ":first-of-type": {
                borderRadius: "var(--radii-8) var(--radii-8) 0 0",
              },
              ":last-of-type": {
                borderRadius: "0 0 var(--radii-8) var(--radii-8)",
              },
            }),
          }}
        />

        {error && (
          // TODO: do we need position: absolute here?
          <ErrorLabel id={label}>{error}</ErrorLabel>
        )}
      </>
    )
  },
)

FormSelect.displayName = "FormSelect"
