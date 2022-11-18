import { CSS } from "@/config"
import { Copy, Spacer } from "@/shared/components"
import { IconPlus, IconSize } from "@/shared/icons"
import { SCreateButton, SCreateButtonIcon } from "./CreateButton.styles"

interface ICreateButton {
  label?: string
  size?: "sm" | "lg"
  color?: "white" | "black"
  iconSize?: IconSize
  ariaLabel: string
  buttonCss?: CSS
  onClick: () => void
}

export const CreateButton = ({
  label,
  size,
  color,
  iconSize,
  ariaLabel,
  onClick,
  buttonCss,
}: ICreateButton) => {
  return (
    <SCreateButton onClick={onClick} css={buttonCss}>
      {label ? (
        <>
          <Copy scale={8} color="system-white" bold>
            {label}
          </Copy>
          <Spacer size={12} horizontal />
        </>
      ) : null}
      <SCreateButtonIcon
        icon={<IconPlus size={iconSize} />}
        ariaLabel={ariaLabel}
        size={size}
        color={color}
        css={{ borderRadius: "$rounded" }}
      />
    </SCreateButton>
  )
}
