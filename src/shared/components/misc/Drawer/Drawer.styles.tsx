import { styled } from "@/config";

import { easing, rgba } from "@/utils";

import { Flex } from "@/shared/components";

export const SDrawer = styled("div", {
  position: "fixed",
  zIndex: 9,
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const SDrawerTopBar = styled("div", {
  padding: "$24",
  position: "sticky",
  top: 0,
  zIndex: 1,
  flex: "none",
  display: "grid",
  alignItems: "center",
  gridTemplateAreas: "'left-action content right-action'",
  gridTemplateColumns: "$space$32 1fr $space$32",
  width: "100%",
  pointerEvents: "none",

  "@xs": {
    paddingX: "$32",
  },

  "@lg": {
    paddingX: "$48",
  },

  "> *": {
    pointerEvents: "auto",
  },
});

export const SDrawerCloseButton = styled("button", {
  reset: true,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$32",
  height: "$32",
  cursor: "pointer",
  transition: "150ms background-color ease-out",

  focus: {
    outline: "none",
  },

  hover: {
    backgroundColor: rgba("neutrals-9", 0.15),
  },

  keyboardFocus: {
    outline: "1px solid $colors$neutrals-9",
  },
});

export const SDrawerContent = styled(Flex, {
  flex: 1,
  padding: "$48 $24",

  "@xs": {
    paddingX: "$32",
  },

  "@lg": {
    padding: "$64 $48",
  },
});

export const SDrawerPanel = styled("div", {
  height: "100%",
  width: 400,
  maxWidth: "100vw",
  backgroundColor: "$$drawerBgColor",
  color: "$$drawerColor",
  transition: easing.smooth({ duration: 400, property: "transform" }),
  position: "relative",
  zIndex: 1,
  overflowY: "auto",

  "&[data-state-direction='left']": {
    alignSelf: "flex-start",
    transform: "translateX(-100%)",
  },
  "&[data-state-direction='right']": {
    alignSelf: "flex-end",
    transform: "translateX(100%)",
  },

  "&[data-state-visible='true']": {
    transform: "translateX(0)",
  },

  variants: {
    variant: {
      primary: {
        /**
         * These are locally scoped tokens that are identical to CSS variables (custom properties),
         * that allow us to simply update its value and the properties which use it, will simply reference the new value
         */
        $$drawerBgColor: "$colors$brand-orange-primary",
        $$drawerBorderColor: "$colors$brand-orange-dark",
        $$drawerColor: "$colors$neutrals-0",
      },
      secondary: {
        $$drawerBgColor: "$colors$neutrals-0",
        $$drawerBorderColor: "$colors$neutrals-3",
        $$drawerColor: "$colors$neutrals-9",
      },
    },

    isLarge: {
      false: {
        "@lg": { width: 500 },
      },
      true: {
        "@lg": { width: 600 },
      },
    },

    hasSeparator: {
      true: {
        [`${SDrawerTopBar}`]: {
          backgroundColor: "$$drawerBgColor",
          borderBottom: "1px solid $$drawerBorderColor",
        },
      },
    },
  },

  defaultVariants: {
    variant: "primary",

    isLarge: "false",
  },
});

export const SDrawerPanelFocusGuard = styled(Flex, {
  minHeight: "100%",
});
