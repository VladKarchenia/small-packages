import { Flex, IFlexProps } from "@/shared/components";

export interface ITabPanelsProps extends IFlexProps {}

export const TabPanels = ({ children }: ITabPanelsProps) => {
  return <Flex css={{ position: "relative" }}>{children}</Flex>;
};
