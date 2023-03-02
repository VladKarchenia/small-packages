import React from "react"

import { CSS } from "@/stitches/config"

import { Copy, IFormLabelProps } from "@/shared/components"

import { SSearchFilterDrawerPreview } from "./SearchFilterDrawerPreview.styles"

export interface ISearchFilterDrawerPreviewProps {
  value: string | React.ReactElement | null
  description?: string
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onFocus?: React.FocusEventHandler<HTMLButtonElement>
  dataTestid?: string
  css?: CSS
  prefix?: React.ReactElement
  suffix?: React.ReactElement
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
      dataTestid,
      css,
      prefix,
      suffix,
    },
    ref,
  ) => {
    return (
      <>
        {description ? (
          <Copy scale={10} css={{ paddingBottom: "$4" }}>
            {description}
            {labelProps?.required ? (
              <Copy as="span" scale={10} css={{ paddingLeft: "$2" }}>
                *
              </Copy>
            ) : null}
          </Copy>
        ) : null}
        <SSearchFilterDrawerPreview
          ref={ref}
          type="button"
          onClick={onClick}
          onFocus={onFocus}
          data-testid={dataTestid}
          withIcon={!!prefix}
          css={css}
        >
          {prefix}
          <Copy scale={8} color={!value ? "neutrals-5" : "neutrals-9"} bold truncate>
            {value ? (!hidePlaceholder ? `${placeholder}: ${value}` : value) : placeholder}
          </Copy>
          {suffix}
        </SSearchFilterDrawerPreview>
      </>
    )
  },
)

SearchFilterDrawerPreview.displayName = "SearchFilterDrawerPreview"
