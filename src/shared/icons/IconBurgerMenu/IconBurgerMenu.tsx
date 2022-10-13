import { withIcon, IIconProps } from "../Icon/Icon"

const IconBurgerMenuImpl = withIcon(
  () => `
    <g fill="currentColor">
      <path d="M28 10V11H4V10H28Z" />
      <path d="M28 22V23H4V22H28Z" />
      <path d="M28 16V17H12V16H28Z" />
    </g>
  `,
)

export const IconBurgerMenu = ({ width = 32, height = 32, ...props }: IIconProps) => {
  return (
    <IconBurgerMenuImpl
      width={width}
      height={height}
      dimensions={{
        height: 32,
        width: 32,
      }}
      fixedSize
      {...props}
    />
  )
}
