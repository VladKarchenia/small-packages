import { CSS } from "@/stitches/config"

import { Copy, Spacer } from "@/shared/components"
import { IconPlus, IconSize } from "@/shared/icons"

import { SCreateRoundedButton, SCreateRoundedButtonIcon } from "./CreateRoundedButton.styles"

interface ICreateRoundedButtonProps {
  label?: string
  size?: "sm" | "lg"
  color?: "white" | "black"
  iconSize?: IconSize
  ariaLabel: string
  buttonCss?: CSS
  onClick: () => void
  dataTestid?: string
}

export const CreateRoundedButton = ({
  label,
  size,
  color,
  iconSize,
  ariaLabel,
  onClick,
  buttonCss,
  dataTestid,
}: ICreateRoundedButtonProps) => {
  return (
    <SCreateRoundedButton onClick={onClick} css={buttonCss}>
      {label ? (
        <>
          <Copy color="neutrals-0" fontWeight="bold">
            {label}
          </Copy>
          <Spacer size={12} horizontal />
        </>
      ) : null}
      <SCreateRoundedButtonIcon
        icon={<IconPlus size={iconSize} />}
        ariaLabel={ariaLabel}
        size={size}
        color={color}
        css={{ borderRadius: "$rounded" }}
        dataTestid={dataTestid}
      />
    </SCreateRoundedButton>
  )
}
