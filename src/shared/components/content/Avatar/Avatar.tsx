import { ComponentProps } from "@/utils/types"
import { Picture } from "@/shared/components"
import { SAvatar } from "./Avatar.styles"

export interface IAvatarProps extends ComponentProps<typeof SAvatar> {
  name: string
  src?: string
}

const imageSizes = {
  tiny: 32,
  small: 40,
  medium: 64,
  large: 80,
}

export const Avatar = ({ src, name, size, ...props }: IAvatarProps) => {
  const defaultImageSize = size && typeof size === "string" ? imageSizes[size] : imageSizes.small

  return (
    <SAvatar initial={!src} size={size} {...props}>
      {src ? (
        <Picture
          defaultImageSize={defaultImageSize}
          defaultImageRatio="1:1"
          alt={name}
          src={src}
          dimensions={[
            {
              mediaQuery: "",
              width: defaultImageSize,
              sizes: `${defaultImageSize}px`,
            },
          ]}
        />
      ) : (
        name?.charAt(0)
      )}
    </SAvatar>
  )
}
