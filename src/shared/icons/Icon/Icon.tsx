import { memo, useEffect, useMemo } from "react"
import { ComponentProps, generateHash } from "@/utils"

import { useIconCache } from "../IconProvider"
import { SIcon, SIconSvg } from "./Icon.styles"

const defaultDimensions = {
  height: 24,
  width: 24,
}

export interface IIconProps extends ComponentProps<typeof SIcon> {
  height?: number
  width?: number

  dimensions?: {
    height?: number
    width?: number
  }

  fixedSize?: boolean

  direction?: "top" | "right" | "bottom" | "left"
}

export type IconSize = IIconProps["size"]

type WithIconReturn<P extends IIconProps> = (props: P) => JSX.Element | null

type IconFnOrString<P extends IIconProps> = ((props: P) => string) | string

export const withIcon = <P extends IIconProps>(icon: IconFnOrString<P>): WithIconReturn<P> => {
  const Icon = (props: P) => {
    const { height, width, dimensions = defaultDimensions, fixedSize = false, ...rest } = props

    const [cache, setCache] = useIconCache()

    const iconStr = typeof icon === "function" ? icon(props) : icon

    const id = useMemo(() => "icon-" + generateHash(iconStr).toString(16), [iconStr])

    /**
     * Prevent icon from accessing/updating the icon cache provider and from adding ids to svg icons,
     * otherwise it will result in multiple icons with the same id attribute
     */
    const isCacheProviderDefined = typeof cache !== "undefined" && typeof setCache !== "undefined"

    const isIconCached = cache?.[id as keyof typeof cache]

    useEffect(() => {
      if (!isIconCached && isCacheProviderDefined) {
        setCache((c) => ({
          ...c,
          [id]: iconStr,
        }))
      }
    }, [iconStr, id, isCacheProviderDefined, isIconCached, setCache])

    return (
      <SIcon {...rest}>
        <SIconSvg
          height={height}
          width={width}
          viewBox={`0 0 ${dimensions?.width} ${dimensions?.height}`}
          fixedSize={fixedSize}
          dangerouslySetInnerHTML={{
            __html: isIconCached
              ? `<use href="#${id}" xlink:href="#${id}" />`
              : `<g id="${isCacheProviderDefined ? id : ""}">${iconStr}</g>`,
          }}
        />
      </SIcon>
    )
  }

  return memo<P>(Icon)
}
