import { CSS } from "@/config"
import { Copy } from "@/shared/components"

import { SInputPreview } from "./InputPreview.styles"

export interface InputPreviewProps {
  figure: React.ReactElement
  value: string | React.ReactElement | null
  placeholder?: string
  onClick?: () => void
  dataTestid?: string
  css?: CSS
}

export const InputPreview: React.FC<InputPreviewProps> = ({
  figure,
  value,
  placeholder,
  onClick,
  dataTestid,
  css,
}) => {
  return (
    <SInputPreview type="button" onClick={onClick} data-testid={dataTestid} css={css}>
      <Copy
        scale={8}
        color="neutrals-9"
        intent="detail"
        bold
        css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
      >
        {value || placeholder}
      </Copy>
      {figure}
    </SInputPreview>
  )
}
