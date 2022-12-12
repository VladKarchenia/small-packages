import React from "react"
import Select, { components } from "react-select"
import { Copy, Flex, FormLabel, IFormLabelProps, Spacer } from "@/shared/components"
import { IconChevronDown, IconTick } from "@/shared/icons"
import { boxShadows, rgba } from "@/utils"
import { SSelectIcon } from "./FormSelect.styles"

interface ISelectProps {
  value: string
  onValueChange: (value: any) => void
  options: string[]
  label: string
  labelProps?: IFormLabelProps
  description: string
  name: string
}

export const FormSelect = React.forwardRef<HTMLDivElement, ISelectProps>(
  ({ label, labelProps, description, value, onValueChange, options, ...props }, forwardedRef) => {
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
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => (
              <SSelectIcon>
                <IconChevronDown size="xs" />
              </SSelectIcon>
            ),
            Option: ({ children, isSelected, ...rest }) => (
              <components.Option isSelected={isSelected} {...rest}>
                <Flex align="center" justify="between">
                  {children}
                  {isSelected ? <IconTick /> : null}
                </Flex>
              </components.Option>
            ),
          }}
          styles={{
            control: (styles) => ({
              ...styles,
              border: "none",
              borderRadius: "var(--radii-8)",
              appearance: "none",
              WebkitAppearance: "none",
              outline: "none",
              cursor: "pointer",
              boxShadow: boxShadows.input.initial,
              transition: "100ms box-shadow ease-out",

              ":hover": {
                boxShadow: boxShadows.input.hover,
              },
              ":focus-within": {
                boxShadow: boxShadows.input.focus,
              },
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "var(--colors-system-black)",
            }),
            valueContainer: (styles) => ({
              ...styles,
              padding: "var(--space-12) var(--space-16)",
            }),
            indicatorsContainer: (styles) => ({
              ...styles,
              paddingRight: "var(--space-12)",
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
              margin: "var(--space-8) 0",
              padding: "var(--space-0)",
              maxHeight: "auto",
              borderRadius: "var(--radii-8)",
              border: "1px solid var(--colors-neutrals-3)",
              boxShadow: `0 var(--space-8) var(--space-24) 0 ${rgba("system-black", 0.08)}`,

              "@media only screen and (min-width: 768px)": {
                maxHeight: "290px",
              },
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
      </>
    )
  },
)

FormSelect.displayName = "FormSelect"
