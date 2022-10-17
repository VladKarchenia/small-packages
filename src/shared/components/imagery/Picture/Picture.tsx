import * as React from "react"
import cx from "classnames"
import { CSS } from "@/config"
import { ComponentProps, generateImageSource, generateImageSourceSet } from "@/utils"

import { SPicture, SPictureImg } from "./Picture.styles"

export type PictureExtraParams = {
  [key: string]: string | number

  h: number
  ar: string
  fit: string
  blur: number

  "max-h": number
  "max-w": number
}

export type IPictureDimensions = {
  width?: number

  /**
   * Extra params for imgix service
   */

  extraParams?: Partial<PictureExtraParams>

  /**
   * Quality of photo, from `0` to `100`. Defaults to `55`.
   * if using `fit=fill`, use `80` or above for best results
   */
  quality?: number

  /**
   * Will output `ar={ratio}` on the image url (imgix only parameter). Pattern should be `"16:9"`
   */
  ratio?: string

  sizes?: string
} & (
  | {
      mediaQuery: string
      mediaQueries?: never
    }
  | {
      mediaQuery?: never
      mediaQueries: string[]
    }
)

export interface IPictureProps extends ComponentProps<typeof SPictureImg> {
  /** the source of the image */
  src: string
  alt: string

  defaultImageSize?: number
  defaultImageQuality?: number
  /**
   * Default image ratio (use when ratio is fixed across all dimensions/breakpoints).
   *
   * Check `IPictureDimensions` comment for usage and pattern
   * */
  defaultImageRatio?: string

  defaultImageExtraParams?: Partial<PictureExtraParams>

  /** the dimension (width) of the images to make it responsive */
  dimensions?: IPictureDimensions[]

  lazyload?: boolean
  lazypreload?: boolean
  lazyblur?: boolean

  /** lazysize expand attributes */
  /** https://github.com/aFarkas/lazysizes#data-expand-attribute */
  lazyExpand?: string

  /**
   * Array of ratios to be generated for the image
   */
  dprRanges?: number[]

  dataTestid?: string

  addDprToSrc?: boolean

  pictureCss?: CSS
}

export const generateBlurredImage = (
  src: string,
  ratio?: string,
  extraParams?: Partial<PictureExtraParams>,
  addDprToSrc?: boolean,
) => {
  return generateImageSource(
    src,
    {
      w: 16,
      q: 10,
      blur: 250,
      ar: ratio,
      ...extraParams,
    },
    1,
    addDprToSrc,
  )
}

/**
 * Picture component for images with optional lazy loading. See lazysizes library
 * for more details on how to configure those specific options https://github.com/aFarkas/lazysizes
 */
export const Picture: React.FC<IPictureProps> = ({
  className,
  src,
  alt = "",
  defaultImageSize,
  dataTestid,
  dimensions = [],
  dprRanges = [1, 2],
  defaultImageQuality = 55,
  defaultImageRatio,
  defaultImageExtraParams,
  lazyload = false,
  lazypreload,
  lazyblur = false,
  addDprToSrc = false,
  onLoad,
  lazyExpand,
  pictureCss,
  ...props
}) => {
  const [shouldLazyload, setLazyload] = React.useState(lazyload)

  const srcRef = React.useRef<string>(src)

  const blurredSrcSet = generateBlurredImage(src, defaultImageRatio, defaultImageExtraParams)
  const imageSrc = generateImageSource(src, {
    w: defaultImageSize,
    q: defaultImageQuality,
    ar: defaultImageRatio,
    ...defaultImageExtraParams,
  })
  const imageSrcSet = generateImageSourceSet(
    src,
    {
      w: defaultImageSize,
      q: defaultImageQuality,
      ar: defaultImageRatio,
      ...defaultImageExtraParams,
    },
    dprRanges,
    addDprToSrc,
  )

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLazyload(false)

    onLoad && onLoad(e)
  }

  // Detect if the src has changed and trigger a lazysizes lazyload
  // Note: This doesn't interfere with lazysizes behaviour or the current behaviour
  React.useEffect(() => {
    if (lazyload) {
      // Compare old src with the new one
      if (src !== srcRef.current) {
        setLazyload(true)
      }

      // Save the new src
      srcRef.current = src
    }
  }, [src, lazyload])

  return (
    <SPicture data-plum-ui="picture" data-testid={dataTestid} css={pictureCss}>
      {dimensions.map((dimension, index) => (
        <PictureSource
          key={`${src}-${index}`}
          dimension={{
            ...dimension,
            extraParams: dimension.extraParams || defaultImageExtraParams,
            ratio: dimension.ratio || defaultImageRatio,
          }}
          src={src}
          dprRanges={dprRanges}
          addDprToSrc={addDprToSrc}
          lazyload={shouldLazyload}
          lazyblur={lazyblur}
        />
      ))}

      <SPictureImg
        {...props}
        className={cx({ lazyload, lazypreload }, className)}
        alt={alt}
        srcSet={shouldLazyload ? (lazyblur ? blurredSrcSet : undefined) : imageSrcSet}
        data-src={imageSrc}
        data-srcset={imageSrcSet}
        data-plum-ui="picture-image"
        lazyblur={lazyblur}
        onLoad={handleLoad}
        data-expand={lazyExpand}
      />
    </SPicture>
  )
}

interface IPictureSourceProps {
  src: string
  dimension: IPictureDimensions
  dprRanges: number[]
  addDprToSrc: boolean
  lazyload: boolean
  lazyblur: boolean
}

function PictureSource({
  src,
  dimension,
  dprRanges,
  addDprToSrc,
  lazyload,
  lazyblur,
}: IPictureSourceProps) {
  const blurredSrcSet = generateBlurredImage(src, dimension.ratio, dimension.extraParams)
  const imageSrcSet = generateImageSourceSet(
    src,
    { w: dimension.width, q: dimension.quality, ar: dimension.ratio, ...dimension.extraParams },
    dprRanges,
    addDprToSrc,
  )

  return (
    <source
      media={dimension.mediaQuery || dimension.mediaQueries?.join(" and ")}
      data-srcset={imageSrcSet}
      srcSet={lazyload ? (lazyblur ? blurredSrcSet : undefined) : imageSrcSet}
      sizes={dimension?.sizes}
    />
  )
}
