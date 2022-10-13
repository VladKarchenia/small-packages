import React from "react";

import { CSS } from "@/config";

import {
  getStyleFromResponsiveProp,
  mergeCSSObjects,
  ResponsiveProp,
} from "@/utils";

import { SAspectRatio } from "./AspectRatio.styles";

export interface IAspectRatioProps {
  className?: string;
  ratio?: string | ResponsiveProp<string>;
  css?: CSS;
}

export const AspectRatio: React.FC<
  React.PropsWithChildren<IAspectRatioProps>
> = ({ children, className, ratio = "1:1", css = {}, ...props }) => {
  return (
    <SAspectRatio
      data-plum-ui="aspect-ratio"
      className={className}
      css={mergeCSSObjects(
        getStyleFromResponsiveProp(ratio, (value) => {
          const [width, height] = value.split(":").map(Number);

          return {
            paddingBottom: `${100 / (width / height)}%`,
          };
        }),
        css
      )}
    >
      <div
        {...props}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </SAspectRatio>
  );
};
