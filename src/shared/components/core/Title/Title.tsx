import * as React from "react";
import cx from "classnames";

import { ComponentProps, ResponsiveProp } from "@/utils/types";
import { atomicClassNames } from "@/utils/styles";

import { Colors } from "@/config/theme/types";

import { STitle } from "./Title.styles";

export interface ITitleProps
  extends Omit<ComponentProps<typeof STitle>, "color"> {
  color?: Colors | ResponsiveProp<Colors>;

  dataTestid?: string;
}

export const Title = ({
  as,
  className,
  color,
  scale = 5,
  dataTestid,
  ...props
}: ITitleProps) => {
  return (
    <STitle
      as={as}
      className={cx(
        atomicClassNames({
          color,
        }).toString(),
        className
      )}
      scale={scale}
      data-testid={dataTestid}
      {...props}
    />
  );
};
