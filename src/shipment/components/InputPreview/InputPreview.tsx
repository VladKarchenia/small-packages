import React from "react"
import { CSS } from "@/config"
import { Copy } from "@/shared/components"

import { SInputPreview } from "./InputPreview.styles"

export interface InputPreviewProps {
  figure?: React.ReactElement
  value: string | React.ReactElement | null
  placeholder?: string
  isPlaceholderShown?: boolean
  onClick?: () => void
  dataTestid?: string
  css?: CSS
}

export const InputPreview = React.forwardRef<HTMLInputElement, InputPreviewProps>(
  ({ figure, value, placeholder, isPlaceholderShown = true, onClick, dataTestid, css }, ref) => {
    return (
      <SInputPreview type="button" onClick={onClick} data-testid={dataTestid} css={css}>
        <Copy
          scale={8}
          color={!value ? "neutrals-5" : "neutrals-9"}
          intent="detail"
          bold
          css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {value ? (isPlaceholderShown ? `${placeholder}: ${value}` : value) : placeholder}
        </Copy>
        {figure}
      </SInputPreview>
    )
  },
)

InputPreview.displayName = "InputPreview"
