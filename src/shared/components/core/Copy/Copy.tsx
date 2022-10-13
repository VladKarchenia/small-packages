import cx from "classnames";
import deepmerge from "deepmerge";

import { ComponentProps, ResponsiveProp } from "@/utils/types";
import { atomicClassNames } from "@/utils/styles";

import { Colors } from "@/config/theme/types";

import { SCopy } from "./Copy.styles";

export type CopyIntent = "cta" | "detail" | "copy";

export interface ICopyProps
  extends Omit<ComponentProps<typeof SCopy>, "color"> {
  color?: Colors | ResponsiveProp<Colors>;

  intent?: CopyIntent;

  uppercase?: boolean;

  dataTestid?: string;
}

function getCopyProps(intent?: CopyIntent) {
  switch (intent) {
    case "cta":
      return {
        tracking: "wider",
        scale: 10,
        bold: true,
        uppercase: true,
      };
    case "detail":
      return {
        tracking: "normal",
        scale: 8,
      };

    case "copy":
    default:
      return {};
  }
}

/**
 * Use for paragraphs and spans of text with options including editorial style,
 * scale and tracking.
 */
export const Copy = ({
  as,
  className,
  color = "neutrals-7",
  intent,
  scale = 6,
  dataTestid,
  ...props
}: ICopyProps) => {
  const copyProps = getCopyProps(intent);

  return (
    <SCopy
      as={as}
      className={cx(
        atomicClassNames({
          color,
        }).toString(),
        className
      )}
      data-testid={dataTestid}
      {...deepmerge(
        {
          ...props,
          scale,
        },
        copyProps
      )}
    />
  );
};
