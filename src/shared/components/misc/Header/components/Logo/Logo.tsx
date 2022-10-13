import React from "react";
import { IllustrationLogo } from "@/shared/illustrations";
import { Flex, Spacer } from "@/shared/components/layout";
import { Box, Copy } from "@/shared/components/core";

interface ILogo {
  href?: string;
}

export const Logo: React.FC<ILogo> = ({ href = "/" }) => {
  return (
    <a
      aria-haspopup="false"
      aria-label="Logo name"
      role="button"
      tabIndex={0}
      href={href}
      style={{ textDecoration: "none" }}
    >
      <Flex align={"center"}>
        <Box css={{ width: 30, "@sm": { width: 40 } }}>
          <IllustrationLogo />
        </Box>
        <Spacer size={4} horizontal />
        <Copy scale={3} color={"brand-green-darkest"} bold>
          АГРОТЕХ
        </Copy>
      </Flex>
    </a>
  );
};
