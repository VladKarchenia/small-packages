import React from "react"

import { CSS } from "@/stitches/config"

import { Copy } from "@/shared/components"

import { SSettingsDrawerPreview } from "./SettingsDrawerPreview.styles"

export interface ISettingsDrawerPreviewProps {
  value: string | React.ReactElement | null
  placeholder?: string
  hidePlaceholder?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onFocus?: React.FocusEventHandler<HTMLButtonElement>
  dataTestid?: string
  css?: CSS
  prefix?: React.ReactElement
  suffix?: React.ReactElement
}

export const SettingsDrawerPreview = React.forwardRef<HTMLButtonElement, ISettingsDrawerPreviewProps>(
  (
    {
      value,
      placeholder,
      hidePlaceholder = false,
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
      <SSettingsDrawerPreview
        ref={ref}
        type="button"
        onClick={onClick}
        onFocus={onFocus}
        data-testid={dataTestid}
        withIcon={!!prefix}
        css={css}
      >
        {prefix}
        <Copy fontWeight="semiBold" truncate>
          {value ? (!hidePlaceholder ? `${placeholder}: ${value}` : value) : placeholder}
        </Copy>
        {suffix}
      </SSettingsDrawerPreview>
    )
  },
)

SettingsDrawerPreview.displayName = "SettingsDrawerPreview"
