import React from "react";
import { useWindowDimensions } from "./useWindowDimensions";
import { Copy, Global } from "@/shared/components";

interface IWrapComponentProps {
  debounce?: number;
}

const DemoComponent = ({ debounce }: IWrapComponentProps) => {
  const { width, height } = useWindowDimensions(debounce);
  return (
    <Global>
      <Copy>{`window width: ${width}px`}</Copy>
      <Copy>{`window height: ${height}px`}</Copy>
    </Global>
  );
};

export const WrapComponent = ({ debounce }: IWrapComponentProps) => {
  return <DemoComponent debounce={debounce} />;
};
