import React from "react";
import { Global } from "../components";

export const CommonLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <Global backgroundColor="neutrals-1">{children}</Global>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCommonLayout = (page: any) => (
  <CommonLayout>{page}</CommonLayout>
);
