import React from "react"
import { CSS } from "@/config"
import { Copy } from "@/shared/components"
import { SSearchFilterDrawerPreview } from "./SearchFilterDrawerPreview.styles"

export interface ISearchFilterDrawerPreviewProps {
  value: string | React.ReactElement | null
  description?: string
  placeholder?: string
  hidePlaceholder?: boolean
  onClick?: (event: unknown) => void
  dataTestid?: string
  css?: CSS
  prefix?: React.ReactElement
  suffix?: React.ReactElement
}

export const SearchFilterDrawerPreview = React.forwardRef<
  HTMLInputElement,
  ISearchFilterDrawerPreviewProps
>(
  (
    {
      value,
      description,
      placeholder,
      hidePlaceholder = false,
      onClick,
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
          </Copy>
        ) : null}
        <SSearchFilterDrawerPreview
          type="button"
          onClick={onClick}
          data-testid={dataTestid}
          withIcon={!!prefix}
          css={css}
        >
          {prefix}
          <Copy
            scale={8}
            color={!value ? "neutrals-5" : "neutrals-9"}
            intent="detail"
            bold
            css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {value ? (!hidePlaceholder ? `${placeholder}: ${value}` : value) : placeholder}
          </Copy>
          {suffix}
        </SSearchFilterDrawerPreview>
      </>
    )
  },
)

SearchFilterDrawerPreview.displayName = "SearchFilterDrawerPreview"
