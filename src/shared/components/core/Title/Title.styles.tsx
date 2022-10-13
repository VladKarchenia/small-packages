import { styled } from "@/config";

import { Text } from "../Text";

export const STitle = styled("h1", Text, {
  fontSmoothing: true,

  variants: {
    thin: {
      true: { fontWeight: 400 },
      false: { fontWeight: 500 },
    },
  },

  defaultVariants: {
    thin: "false",
  },
});
