import { stringifyUrl } from "query-string";

export const calculateImageHeight = (width: number, ratio: string): number => {
  const ratioArr = ratio.split(":");

  const wRatio = parseInt(ratioArr[0], 10);
  const hRatio = parseInt(ratioArr[1], 10);

  return Math.round((width * hRatio) / wRatio);
};

const MAX_IMAGE_SIZE = 4000;

function clamp(size: number): number {
  return Math.max(0, Math.min(size, MAX_IMAGE_SIZE));
}

function addProtocolToUrl(url: string): string {
  return url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, protocol, restOfUrl) =>
    protocol ? match : `https://${restOfUrl}`
  );
}

export type GenerateImageSourceParams = {
  [key: string]: string | number | undefined;

  w?: string | number;
  h?: string | number;

  "max-w"?: string | number;
  "max-h"?: string | number;

  ar?: string;

  blur?: number;

  /**
   * Quality
   */
  q?: number;
};

export function generateImageSource(
  url: string,
  { q = 55, ...params }: GenerateImageSourceParams,
  dpr = 1,
  addDprToSrc?: boolean
): string {
  let w, h, maxW, maxH;

  if (params.w) w = clamp((typeof params.w === "string" ? parseInt(params.w, 10) : params.w) * dpr);
  if (params.h) h = clamp((typeof params.h === "string" ? parseInt(params.h, 10) : params.h) * dpr);

  if (params["max-w"])
    maxW = clamp(
      (typeof params["max-w"] === "string" ? parseInt(params["max-w"], 10) : params["max-w"]) * dpr
    );
  if (params["max-h"])
    maxH = clamp(
      (typeof params["max-h"] === "string" ? parseInt(params["max-h"], 10) : params["max-h"]) * dpr
    );

  return stringifyUrl(
    {
      url: addProtocolToUrl(url),
      query: {
        ...params,
        w,
        h,
        maxW,
        maxH,
        q,
        dpr: addDprToSrc ? dpr : undefined,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );
}

export function generateImageSourceSet(
  url: string,
  params: GenerateImageSourceParams,
  dprRanges: number[],
  addDprToSrc?: boolean
) {
  const srcset: string[] = [];

  if (dprRanges.length > 0) {
    dprRanges.forEach((dpr) => {
      srcset.push(`${generateImageSource(url, params, dpr, addDprToSrc)} ${dpr}x`);
    });
  } else {
    srcset.push(generateImageSource(url, params, 1, addDprToSrc));
  }

  return srcset.join(", ");
}
