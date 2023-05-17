import React from "react"

import { escapeKeyDown } from "@/shared/utils"

import { Box, Copy, ErrorLabel, IFormLabelProps, Spacer } from "@/shared/components"

import { SSearchFilterDrawerPreview } from "./SearchFilterDrawerPreview.styles"

export interface ISearchFilterDrawerPreviewProps {
  value: string | React.ReactElement | null
  description?: string
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onFocus?: React.FocusEventHandler<HTMLButtonElement>
  close?: () => void
  dataTestid?: string
  prefix?: React.ReactElement
  suffix?: React.ReactElement
  disabled?: boolean
  error?: React.ReactNode
  hasError?: boolean
}

export const SearchFilterDrawerPreview = React.forwardRef<
  HTMLButtonElement,
  ISearchFilterDrawerPreviewProps
>(
  (
    {
      value,
      description,
      placeholder,
      hidePlaceholder = false,
      labelProps,
      onClick,
      onFocus,
      close,
      dataTestid,
      prefix,
      suffix,
      disabled,
      error,
      hasError,
    },
    ref,
  ) => {
    return (
      <>
        {description && (
          <>
            <Copy scale={10} color="neutrals-5" fontWeight="semiBold">
              {description}
              {labelProps?.required ? (
                <Copy as="span" scale={10} fontWeight="semiBold" css={{ paddingLeft: "$2" }}>
                  *
                </Copy>
              ) : null}
            </Copy>
            <Spacer size={4} />
          </>
        )}

        <SSearchFilterDrawerPreview
          ref={ref}
          type="button"
          withIcon={!!prefix}
          hasError={!!error || hasError}
          disabled={disabled}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={(e) => (close ? escapeKeyDown(e.key) && close() : null)}
          data-testid={dataTestid}
        >
          {prefix}
          <Copy color={!value ? "neutrals-5" : "system-inherit"} truncate>
            {value ? (!hidePlaceholder ? `${placeholder}: ${value}` : value) : placeholder}
          </Copy>
          {suffix}
        </SSearchFilterDrawerPreview>

        {error && (
          <Box css={{ position: "absolute" }}>
            <ErrorLabel id="dateFieldError">{error}</ErrorLabel>
          </Box>
        )}
      </>
    )
  },
)

SearchFilterDrawerPreview.displayName = "SearchFilterDrawerPreview"
