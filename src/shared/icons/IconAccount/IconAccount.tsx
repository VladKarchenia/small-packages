import { colorsMap } from "@/config/theme/colors"

import { IIconProps, withIcon } from "../Icon/Icon"

const themeColors = {
  default: colorsMap["system-grey-dark"],
  transparent: "transparent",
}

const getColorByTheme = (theme: keyof typeof themeColors) => {
  return themeColors[theme] || themeColors["default"]
}

export interface IIconAccountProps extends IIconProps {
  isAuthenticated?: boolean
  theme?: keyof typeof themeColors
}

export const IconAccount = withIcon<IIconAccountProps>(
  ({ isAuthenticated = false, theme = "default" }) => `
    <g fill="none" fillRule="evenodd" transform="translate(.786 1.186)">
      <g stroke="currentColor" strokeWidth="1.4">
        <path strokeLinecap="round" d="M6.213 12.139c-.921.873-1.503 2.178-1.503 3.63v4.332m13.393-.571v-3.76c0-1.555-.687-2.94-1.739-3.809" />
        <path d="M11.124 3.514c2.347 0 4.295 1.93 4.295 4.226 0 2.357-1.938 4.295-4.295 4.295-2.341 0-4.226-1.921-4.226-4.295 0-2.313 1.894-4.226 4.226-4.226z" />
      </g>

      <ellipse cx="11.012" cy="10.967" stroke="${
        isAuthenticated ? colorsMap["brand-yellow-primary"] : getColorByTheme(theme)
      }" rx="11.512" ry="11.467" />
    </g>
`,
)
