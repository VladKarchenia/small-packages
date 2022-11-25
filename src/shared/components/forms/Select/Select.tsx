import React from "react"
import { Portal, Root, Value } from "@radix-ui/react-select"
import { Copy, Flex, FormLabel, IFormLabelProps, Spacer } from "@/shared/components"
import { IconChevronDown } from "@/shared/icons"
import { SSelectIcon, SSelectTrigger, SSelectContent, SSelectViewport } from "./Select.styles"

interface ISelectProps {
  value: string
  onValueChange: (value: any) => void
  label: string
  postLabel?: string
  labelProps?: IFormLabelProps
  description: string
  name: string
  children: React.ReactNode
}

export const Select = React.forwardRef<HTMLButtonElement, ISelectProps>(
  ({ children, label, postLabel, labelProps, description, ...props }, forwardedRef) => {
    return (
      <Root {...props}>
        <Flex justify="between">
          <FormLabel {...labelProps}>{label}</FormLabel>

          {postLabel && (
            <>
              <Spacer size={8} horizontal />
              {postLabel}
            </>
          )}
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
        <SSelectTrigger ref={forwardedRef}>
          <Value />
          <SSelectIcon>
            <IconChevronDown size="xs" />
          </SSelectIcon>
        </SSelectTrigger>
        <Portal>
          <SSelectContent>
            <SSelectViewport>{children}</SSelectViewport>
          </SSelectContent>
        </Portal>
      </Root>
    )
  },
)

Select.displayName = "Select"
