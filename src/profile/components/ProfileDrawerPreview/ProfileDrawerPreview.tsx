import React from "react"
import { CSS } from "@/config"
import { Copy, IFormLabelProps } from "@/shared/components"
import { SProfileDrawerPreview } from "./ProfileDrawerPreview.styles"

export interface IProfileDrawerPreviewProps {
  value: string | React.ReactElement | null
  placeholder?: string
  hidePlaceholder?: boolean
  labelProps?: IFormLabelProps
  onClick?: (event: unknown) => void
  onFocus?: (event: unknown) => void
  dataTestid?: string
  css?: CSS
  prefix?: React.ReactElement
  suffix?: React.ReactElement
}

export const ProfileDrawerPreview = React.forwardRef<HTMLButtonElement, IProfileDrawerPreviewProps>(
  (
    {
      value,
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
        <SProfileDrawerPreview
          ref={ref}
          type="button"
          onClick={onClick}
          onFocus={onFocus}
          data-testid={dataTestid}
          withIcon={!!prefix}
          css={css}
        >
          {prefix}
          <Copy
            scale={8}
            color={!value ? "system-black" : "system-black"}
            intent="detail"
            bold
            css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {value ? (!hidePlaceholder ? `${placeholder}: ${value}` : value) : placeholder}{" "}
          </Copy>
          {suffix}
        </SProfileDrawerPreview>
      </>
    )
  },
)

ProfileDrawerPreview.displayName = "ProfileDrawerPreview"
